import React, { useContext, useEffect, useState } from "react";
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
import Grid from "../components/Grid";
import CloseIcon from "@mui/icons-material/Close";
import GridRadio from "../components/GridRadio";

function CustomMapEvents() {
  const {
    updateAssetMarkers,
    updateGrids,
    setZoom,
    zoom,
    latlon,
    selectedMarker,
    setSelectedMarker,
  } = useContext(MapAssetContext);

  const map = useMapEvents({
    dragend: () => {
      setZoom(map.getZoom());
      const bbox = map.getBounds();
      updateAssetMarkers(
        {
          left: bbox._southWest.lng,
          right: bbox._northEast.lng,
          top: bbox._northEast.lat,
          bottom: bbox._southWest.lat,
        },
        map.getZoom()
      );
      updateGrids(
        {
          left: bbox._southWest.lng,
          right: bbox._northEast.lng,
          top: bbox._northEast.lat,
          bottom: bbox._southWest.lat,
        },
        map.getZoom()
      );
    },
    zoomend: () => {
      setZoom(map.getZoom());
      const bbox = map.getBounds();
      updateAssetMarkers(
        {
          left: bbox._southWest.lng,
          right: bbox._northEast.lng,
          top: bbox._northEast.lat,
          bottom: bbox._southWest.lat,
        },
        map.getZoom()
      );
      updateGrids(
        {
          left: bbox._southWest.lng,
          right: bbox._northEast.lng,
          top: bbox._northEast.lat,
          bottom: bbox._southWest.lat,
        },
        map.getZoom()
      );
    },
    click: () => {
      if (Object.keys(selectedMarker).length > 0) {
        setSelectedMarker({});
      }
    },
  });

  useEffect(() => {
    if (latlon && zoom && Object.keys(selectedMarker).length === 0) {
      map.flyTo(latlon, Math.min(14, zoom));
    }
    return;
  }, [selectedMarker]);

  useEffect(() => {
    const bbox = map.getBounds();
    updateAssetMarkers(
      {
        left: bbox._southWest.lng,
        right: bbox._northEast.lng,
        top: bbox._northEast.lat,
        bottom: bbox._southWest.lat,
      },
      12
    );
    updateGrids(
      {
        left: bbox._southWest.lng,
        right: bbox._northEast.lng,
        top: bbox._northEast.lat,
        bottom: bbox._southWest.lat,
      },
      12
    );
    setZoom(map.getZoom());
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (latlon) {
      map.flyTo(latlon, Math.max(16, zoom));
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const {
    assetMarkers,
    zoom,
    setLatlon,
    selectedMarker,
    setSelectedMarker,
    grids,
  } = useContext(MapAssetContext);
  const [layer, setLayer] = useState("None");
  return (
    <div className="custom-map">
      <MapContainer
        center={[13.732227456, 100.568009766]}
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
        {layer === "Market Price" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              elem.price_dol > 0 && (
                <Grid
                  key={index}
                  left={elem.left}
                  right={elem.right}
                  top={elem.top}
                  bottom={elem.bottom}
                  value={elem.price}
                  min={0}
                  max={500000}
                  name="Market Price"
                />
              )
            );
          })}
        {layer === "DOL Price" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              elem.price_dol > 0 && (
                <Grid
                  key={index}
                  left={elem.left}
                  right={elem.right}
                  top={elem.top}
                  bottom={elem.bottom}
                  value={elem.price_dol}
                  min={0}
                  max={200000}
                  name="DOL Price"
                />
              )
            );
          })}
        {layer === "Attraction Score" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              <Grid
                key={index}
                left={elem.left}
                right={elem.right}
                top={elem.top}
                bottom={elem.bottom}
                value={elem.score_attraction}
                min={0}
                max={10}
                name="Attraction Score"
              />
            );
          })}
        {layer === "Education Score" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              <Grid
                key={index}
                left={elem.left}
                right={elem.right}
                top={elem.top}
                bottom={elem.bottom}
                value={elem.score_education}
                min={0}
                max={10}
                name="Education Score"
              />
            );
          })}
        {layer === "Service Score" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              <Grid
                key={index}
                left={elem.left}
                right={elem.right}
                top={elem.top}
                bottom={elem.bottom}
                value={elem.score_service}
                min={0}
                max={10}
                name="Service Score"
              />
            );
          })}
        {layer === "Transportation Score" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              <Grid
                key={index}
                left={elem.left}
                right={elem.right}
                top={elem.top}
                bottom={elem.bottom}
                value={elem.score_bts}
                min={0}
                max={10}
                name="Transportation Score"
              />
            );
          })}
        {layer === "Environment Score" &&
          grids &&
          grids.length > 0 &&
          grids.map((elem, index) => {
            return (
              <Grid
                key={index}
                left={elem.left}
                right={elem.right}
                top={elem.top}
                bottom={elem.bottom}
                value={elem.score_location}
                min={0}
                max={10}
                name="Enviroment Score"
              />
            );
          })}
        <ZoomControl position="bottomleft" />
      </MapContainer>
      {selectedMarker && Object.keys(selectedMarker).length > 0 && (
        <div className="asset-div">
          <CloseIcon
            className="close-asset-card"
            onClick={(e) => {
              setSelectedMarker({});
            }}
          />
          <div className="asset-card">
            <Popup data={selectedMarker} />
          </div>
        </div>
      )}
      <div className="grid-radio">
        <GridRadio
          handleChange={(e) => {
            console.log(e.target.defaultValue);
            setLayer(e.target.defaultValue);
          }}
          selected={layer}
        />
      </div>
    </div>
  );
}

export default CustomMap;
