import axios from "../axios.config";

function getGrid(bbox, zoom, handleThen, handleCache) {
  axios
    .get("/grid", {
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

export default getGrid;
