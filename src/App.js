
import React, {useState, useEffect} from 'react';
import HomePage from './pages/Home_Page';
import HeaderPage from './pages/Header_Page';
import FooterPage from './pages/Footer_Page';
import GalleryPage from './pages/Gallery_Page';
import ProductsPage from './pages/Products_Page';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from './Loader';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
return (
    <>
        <Router>
          <Routes>
            <Route path='/'>
                <Route index element=  {showLoader ? <Loader /> : <HomePage />}/>
                <Route path='/Header_Page' element={<HeaderPage/>} ></Route>
                <Route path='/Footer_Page' element={<FooterPage/>} ></Route>
                <Route path='/Gallery_Page' element={<GalleryPage/>} ></Route>
                <Route path='/Products_Page' element={<ProductsPage/>} ></Route>
                <Route path='/Home_Page' element={<HomePage/>} ></Route>
                <Route path='/Loader' element={<Loader/>}></Route>
            </Route>
          </Routes>
        </Router>
    </>
);
}

export default App;

