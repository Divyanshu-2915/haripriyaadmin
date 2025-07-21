import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import HomePage from './pages/Home_Page';

const Sample = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set timeout to match your loader animation duration
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? <Loader /> : <HomePage />}
    </>
  );
};

export default Sample;