import "./App.css";
import MapAssetContextProvider from "./contexts/MapAssetContextProvider";
import CustomMap from "./pages/CustomMap";

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
