import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
        {/*<Navbar></Navbar>*/}
        <Routes>
            <Route path='/' element={<Home/>} ></Route>
        </Routes>
    </div>
  );
}

export default App;
