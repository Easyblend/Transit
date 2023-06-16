import "./App.css";
import Sidebar from "./Components/Sidebar";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  return (
    <div className="container-fluid mx-0 g-0 p-0">
      <div className="row mx-0 g-0 p-0">
        <div className="col-5 col-sm-3 col-md-2">
          <Sidebar />
        </div>
        <div className="col-10 col-sm-9">
          <DashboardPage />
        </div>
      </div>
    </div>
  );
}

export default App;
