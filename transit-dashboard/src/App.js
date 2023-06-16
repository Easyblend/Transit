import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import DashboardPage from "./Pages/DashboardPage";
import OtherPages from "./Pages/OtherPages";

function App() {
  return (
    <div className="container-fluid mx-0 g-0 p-0">
      <div className="row mx-0 g-0 p-0">
        <div className="col-2 col-sm-3 col-md-2">
          <Sidebar />
        </div>
        <div className="col-10 col-sm-9 mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/other" element={<OtherPages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
