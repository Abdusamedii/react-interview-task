import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { OverlayProvider } from "./context/OverlayContext";

function App() {
  return (
    <BrowserRouter>
      <OverlayProvider>
        <AppRoutes />
      </OverlayProvider>
    </BrowserRouter>
  );
}

export default App;
