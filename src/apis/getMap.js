import axios from "../axios.config";

function getMap(bbox, zoom, handleThen, handleCache) {
  axios
    .get("/map", {
      params: {
        left: bbox.left,
        right: bbox.right,
        top: bbox.top,
        bottom: bbox.bottom,
        zoom: zoom,
      },
    })
    .then(handleThen)
    .catch(handleCache);
}

export default getMap;
