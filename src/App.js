import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OverviewPage from "./pages/overviewPage";
import MainLayout from "./layouts/mainLayout";
import UsersPage from "./pages/usersPage";
import ProductsPage from "./pages/productsPage";
import RetailersPage from "./pages/retailersPage";
import ScansPage from "./pages/scansPage";
import SettingsPage from "./pages/settingsPage";
import ManufacturesPage from "./pages/manufacturesPage";
import DistributersPage from "./pages/distributersPage";
import LoginPage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/retailers" element={<RetailersPage />} />
            <Route path="/scans" element={<ScansPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/manufactures" element={<ManufacturesPage />} />
            <Route path="/distributors" element={<DistributersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
