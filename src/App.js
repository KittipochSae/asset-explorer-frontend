import "./App.css";
import MapAssetContextProvider from "./context/MapAssetContextProvider";
import CustomMap from "./page/CustomMap";

function App() {
  return (
    <MapAssetContextProvider>
      <div className="App">
        <CustomMap />
      </div>
    </MapAssetContextProvider>
  );
}

export default App;
