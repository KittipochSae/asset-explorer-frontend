import React, { createContext, useState } from "react";
import config from "../config.json";

export const MapAssetContext = createContext();
const axios = require("axios");

function MapAssetContextProvider({ children }) {
  const [assetMarkers, setAssetMarkers] = useState([]);
  const [grids, setGrids] = useState([]);
  const [zoom, setZoom] = useState(12);
  const [latlon, setLatlon] = useState();
  const [selectedMarker, setSelectedMarker] = useState({});

  function updateAssetMarkers(bbox, zoom) {
    const url = `${config.BACKEND_URL}/map`;
    axios
      .get(url, {
        params: {
          left: bbox.left,
          right: bbox.right,
          top: bbox.top,
          bottom: bbox.bottom,
          zoom: zoom,
        },
      })
      .then(function (response) {
        setAssetMarkers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateGrids(bbox, zoom) {
    const url = `${config.BACKEND_URL}/grid`;
    axios
      .get(url, {
        params: {
          left: bbox.left,
          right: bbox.right,
          top: bbox.top,
          bottom: bbox.bottom,
          zoom: zoom,
        },
      })
      .then(function (response) {
        setGrids(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
