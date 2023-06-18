
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forget from './components/Forget';
import Login from './components/Login';
import Forma from './components/Forma';
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/forma" element={<Forma />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
