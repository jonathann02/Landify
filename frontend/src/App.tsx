import { Route, Routes } from "react-router-dom";


import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RequireAuth } from "./components/RequireAuth";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { SiteEditorPage } from "./pages/SiteEditorPage";
import { PublicSitePage } from "./pages/PublicSitePage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/s/:slug" element={<PublicSitePage />} />

      <Route 
      element={
        <RequireAuth>
          <AppLayout />
        </RequireAuth>
      }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sites/:siteId/editor" element={<SiteEditorPage />} />
        </Route>


     
    </Routes>
  );
}

export default App;

