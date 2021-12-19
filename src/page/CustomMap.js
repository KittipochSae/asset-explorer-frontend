import React, { useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Popup from "../components/Popup";
import { MapAssetContext } from "../context/MapAssetContextProvider";
import { iconHouse, iconCondo, iconTownHouse } from "../components/Icon";

function CustomMapEvents() {
  const {
    assetMarkers,
    updateAssetMarkers,
    setZoom,
    zoom,
    latlon,
    selectedMarker,
    setSelectedMarker,
  } = useContext(MapAssetContext);

  const map = useMapEvents({
    dragend: () => {
      const bbox = map.getBounds();
      updateAssetMarkers({
        left: bbox._southWest.lng,
        right: bbox._northEast.lng,
        top: bbox._northEast.lat,
        bottom: bbox._southWest.lat,
      });
      setZoom(map.getZoom());
    },
    zoomend: () => {
      const bbox = map.getBounds();
      updateAssetMarkers({
        left: bbox._southWest.lng,
        right: bbox._northEast.lng,
        top: bbox._northEast.lat,
        bottom: bbox._southWest.lat,
      });
      setZoom(map.getZoom());
    },
    click: () => {
      if (Object.keys(selectedMarker).length > 0) {
        setSelectedMarker({});
        map.flyTo(latlon, Math.min(14, zoom));
      }
    },
  });

  useEffect(() => {
    const bbox = map.getBounds();
    updateAssetMarkers({
      left: bbox._southWest.lng,
      right: bbox._northEast.lng,
      top: bbox._northEast.lat,
      bottom: bbox._southWest.lat,
    });
    setZoom(map.getZoom());
    return;
  }, []);

  useEffect(() => {
    if (latlon) {
      map.flyTo(latlon, Math.max(16, zoom));
    }
    return;
  }, [latlon]);

  return null;
}

function selectedIcon(asset_type) {
  if (asset_type === "03 ทาวน์เฮ้าส์") {
    return iconTownHouse;
  }
  if (asset_type === "05 คอนโดมิเนียม") {
    return iconCondo;
  }
  return iconHouse;
}

function CustomMap() {
  const { assetMarkers, zoom, setLatlon, selectedMarker, setSelectedMarker } =
    useContext(MapAssetContext);

  return (
    <div className="custom-map">
      <MapContainer
        center={[13.736717, 100.523186]}
        zoom={12}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <CustomMapEvents />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zoom && zoom < 15 ? (
          <MarkerClusterGroup>
            {assetMarkers &&
              assetMarkers.map((elem, index) => {
                return (
                  <Marker
                    key={index}
                    position={[elem.latitude, elem.longitude]}
                    eventHandlers={{
                      click: () => {
                        setSelectedMarker(elem);
                        setLatlon([elem.latitude, elem.longitude]);
                      },
                    }}
                    icon={selectedIcon(elem.asset_type)}
                  />
                );
              })}
          </MarkerClusterGroup>
        ) : (
          <>
            {assetMarkers &&
              assetMarkers.map((elem, index) => {
                return (
                  <Marker
                    key={index}
                    position={[elem.latitude, elem.longitude]}
                    eventHandlers={{
                      click: () => {
                        setSelectedMarker(elem);
                        setLatlon([elem.latitude, elem.longitude]);
                      },
                    }}
                    icon={selectedIcon(elem.asset_type)}
                  />
                );
              })}
          </>
        )}
        <ZoomControl position="bottomleft" />
      </MapContainer>
      {selectedMarker && Object.keys(selectedMarker).length > 0 && (
        <div className="asset-card">
          <Popup data={selectedMarker} />
        </div>
      )}
    </div>
  );
}

export default CustomMap;
