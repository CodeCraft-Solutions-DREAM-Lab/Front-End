import { BrowserRouter, Routes, Route } from "react-router-dom";

import './output.css'
import './App.css'
import HomePage from './Home/HomePage.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
