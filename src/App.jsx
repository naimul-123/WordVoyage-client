
import { Outlet } from "react-router-dom";
import Foot from "./components/Footer";
import Navbar from "./components/Navbar";
function App() {



  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Foot></Foot>
    </div>
  )
}

export default App
