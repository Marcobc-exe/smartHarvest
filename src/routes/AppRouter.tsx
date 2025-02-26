import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/Home/HomePage";
import { CreateFarmPage } from "../Pages/CreateFarm/CreateFarmPage";
import { HomeMapPage } from "../Pages/Home/HomeMapPage/HomeMapPage";

export const AppRouter = () => {
  const maps = JSON.parse(localStorage.getItem("maps") ?? "[]");
  const areMaps = maps.length >= 1 ? true : false;
  
  return (
    <>
      <Routes>
        <Route path="/" element={areMaps ? <HomeMapPage /> : <HomePage />} />
        <Route path="/createFarm" element={<CreateFarmPage />} />
        <Route path="/mapView" element={<HomeMapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}