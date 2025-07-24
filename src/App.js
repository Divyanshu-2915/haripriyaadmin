import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MorningChecklist from './Pages/Morning_Dilevery';
import EveningChecklist from './Pages/Evening_Dilevery';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className='border-2 border-black h-screen'>
      <div className='border-2 border-black justify-self-center w-96 p-5 items-center flex flex-col gap-5'>
        <button
          className='border-2 border-black w-72 h-16 rounded-full'
          onClick={() => navigate('/morning')}
        >
          Morning Delivery List
        </button>
        <button
          className='border-2 border-black w-72 h-16 rounded-full'
          onClick={() => navigate('/evening')}
        >
          Evening Delivery List
        </button>
        <button
          className='border-2 border-black w-72 h-16 rounded-full'
          onClick={() => navigate('/consumer')}
        >
          Consumer List
        </button>
        <button
          className='border-2 border-black w-72 h-16 rounded-full'
          onClick={() => navigate('/bill')}
        >
          Bill Creation
        </button>
        <button
          className='border-2 border-black w-72 h-16 rounded-full'
          onClick={() => navigate('/history')}
        >
          Bills History
        </button>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/morning" element={<MorningChecklist />} />
        <Route path="/evening" element={<EveningChecklist />} />
        {/* You can create placeholder components for the rest if needed */}
        <Route path="/consumer" element={<div className="p-6">Consumer List Page</div>} />
        <Route path="/bill" element={<div className="p-6">Bill Creation Page</div>} />
        <Route path="/history" element={<div className="p-6">Bills History Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
