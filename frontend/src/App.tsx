import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AppLayout } from "./pages/layout/AppLayout.tsx";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* senare: /dashboard, /sites/:id/edit, /s/:slug */}
      </Routes>
    </AppLayout>
  );
}

export default App;

