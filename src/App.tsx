import { HashRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";

const App = () => {
  const listOfMaps = [
    {
      id: "0",
      name: "VEGA BAJA",
      center: "-32.420329; -70.952348",
      zoom: 14,
    },
    {
      id: "1",
      name: "Billy Corn",
      center: "-32.411042; -71.047160",
      zoom: 14,
    }
  ];

  // localStorage.setItem("maps", JSON.stringify(listOfMaps))
    
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  )
}

export default App
