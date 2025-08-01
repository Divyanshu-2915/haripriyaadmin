import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MorningChecklist from './Pages/Morning_Dilevery';
import EveningChecklist from './Pages/Evening_Dilevery';
import ConsumerTable from './Pages/Consumer';
import EnglishBill from './Pages/Bill_Generator_Eng';
import HindiBill from './Pages/Bill_Generator_Hin';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen flex items-center justify-center border-2 border-black">
      <div className='border-2 border-black justify-self-center w-96 p-5 items-center flex flex-col gap-5 rounded-3xl'>
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
          onClick={() => navigate('/billeng')}
        >
          Bill Creation English
        </button>
        <button
          className='border-2 border-black w-72 h-16 rounded-full'
          onClick={() => navigate('/billhin')}
        >
          Bill Creation Hindi
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
        <Route path="/consumer" element={<ConsumerTable/>} />
        <Route path="/billeng" element={<EnglishBill/>} />
        <Route path="/billhin" element={<HindiBill/>} />
      </Routes>
    </Router>
  );
};

export default App;
