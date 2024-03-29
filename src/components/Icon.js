import L from "leaflet";

const iconHouse = new L.Icon({
  iconUrl: require("../imgs/marker-house.png"),
  iconRetinaUrl: require("../imgs/marker-house.png"),
  iconSize: new L.Point(25, 42),
  iconAnchor: new L.Point(13, 42),
  shadowUrl: require("../imgs/marker-shadow.png"),
  shadowRetinaUrl: require("../imgs/marker-shadow.png"),
  shadowSize: new L.Point(25, 42),
  shadowAnchor: new L.Point(0, 42),
});

const iconTownHouse = new L.Icon({
  iconUrl: require("../imgs/marker-townhouse.png"),
  iconRetinaUrl: require("../imgs/marker-townhouse.png"),
  iconSize: new L.Point(25, 42),
  iconAnchor: new L.Point(13, 42),
  shadowUrl: require("../imgs/marker-shadow.png"),
  shadowRetinaUrl: require("../imgs/marker-shadow.png"),
  shadowSize: new L.Point(25, 42),
  shadowAnchor: new L.Point(0, 42),
});

const iconCondo = new L.Icon({
  iconUrl: require("../imgs/marker-condo.png"),
  iconRetinaUrl: require("../imgs/marker-condo.png"),
  iconSize: new L.Point(25, 42),
  iconAnchor: new L.Point(13, 42),
  shadowUrl: require("../imgs/marker-shadow.png"),
  shadowRetinaUrl: require("../imgs/marker-shadow.png"),
  shadowSize: new L.Point(25, 42),
  shadowAnchor: new L.Point(0, 42),
});

export { iconHouse, iconTownHouse, iconCondo };
