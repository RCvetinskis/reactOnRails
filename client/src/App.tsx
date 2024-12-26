import "./App.css";
import AppRouter from "./components/app-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/nav/navbar";
function App() {
  return (
    <Router>
      <div className="w-screen">
        <NavBar />
        <div className="md:px-4 md:container mx-auto mt-20 ">
          <AppRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
