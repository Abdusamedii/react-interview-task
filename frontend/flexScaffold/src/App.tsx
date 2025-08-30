import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { OverlayProvider } from "./context/OverlayContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <OverlayProvider>
        <AppRoutes />
      </OverlayProvider>
    </BrowserRouter>
  );
}

export default App;
