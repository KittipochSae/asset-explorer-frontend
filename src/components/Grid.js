import { Rectangle, Popup } from "react-leaflet";

function Grid({ left, right, top, bottom, value, min, max, name }) {
  const bounds = [
    [top, left],
    [bottom, right],
  ];

  const pathOptions = {
    color: getColor((value - min) / (max - min)),
    weight: 0.7,
  };

  return (
    <Rectangle bounds={bounds} pathOptions={pathOptions} opacity={0.3}>
      <Popup>
        {name} = <b>{value}</b>
      </Popup>
    </Rectangle>
  );
}

export default Grid;

function getColor(value) {
  var hue = (value * 120).toString(10);
  return `hsl(${hue},100%,50%)`;
}
