import React, { createContext, useState } from "react";
import getMap from "../apis/getMap";
import getGrid from "../apis/getGrid";

export const MapAssetContext = createContext();

function MapAssetContextProvider({ children }) {
  const [assetMarkers, setAssetMarkers] = useState([]);
  const [grids, setGrids] = useState([]);
  const [zoom, setZoom] = useState(12);
  const [latlon, setLatlon] = useState();
  const [selectedMarker, setSelectedMarker] = useState({});

  function updateAssetMarkers(bbox, zoom) {
    getMap(
      bbox,
      zoom,
      (response) => {
        setAssetMarkers(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function updateGrids(bbox, zoom) {
    getGrid(
      bbox,
      zoom,
      (response) => {
        setGrids(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <MapAssetContext.Provider
      value={{
        assetMarkers,
        updateAssetMarkers,
        grids,
        updateGrids,
        zoom,
        setZoom,
        latlon,
        setLatlon,
        selectedMarker,
        setSelectedMarker,
      }}
    >
      {children}
    </MapAssetContext.Provider>
  );
}

export default MapAssetContextProvider;
