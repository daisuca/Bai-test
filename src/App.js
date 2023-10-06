import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Page from "./ListSpecies/Page";
import Rank from "./ListSpecies/Rank";
import Update from "./ListSpecies/Update";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/page" element={<Page />} />
        <Route path="/add" element={<Rank />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
