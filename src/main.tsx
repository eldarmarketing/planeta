import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { STOProvider } from "./context/STOContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { APIProvider } from "./context/APIContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        {/* APIProvider - новый контекст для работы с API */}
        <APIProvider>
          {/* STOProvider - старый контекст для обратной совместимости */}
          <STOProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </STOProvider>
        </APIProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
