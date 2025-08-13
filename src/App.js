import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MorningChecklist from './Pages/Morning_Dilevery';
import EveningChecklist from './Pages/Evening_Dilevery';
import ConsumerTable from './Pages/Consumer';
import BillGeneratorMerged from './Pages/Bill_Generator_Merged';
import JulyPaymentStatusList from './Pages/July_Payment_History';
import JunePaymentStatusList from './Pages/June_Payment_History';


const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className='max-w-4xl w-full'>
        {/* Grid container - 3x3 on larger screens, 2x2 on mobile */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
          <button
            className='border-2 border-black w-full h-20 md:h-24 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors'
            onClick={() => navigate('/morning')}
          >
            Morning Delivery List
          </button>
          <button
            className='border-2 border-black w-full h-20 md:h-24 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors'
            onClick={() => navigate('/evening')}
          >
            Evening Delivery List
          </button>
          <button
            className='border-2 border-black w-full h-20 md:h-24 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors'
            onClick={() => navigate('/consumer')}
          >
            Consumer List
          </button>
                  <button
          className='border-2 border-black w-full h-20 md:h-24 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors'
          onClick={() => navigate('/billgenerator')}
        >
          Bill Generator (Hindi + English)
        </button>
                    <button
            className='border-2 border-black w-full h-20 md:h-24 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors'
            onClick={() => navigate('/june-history')}
          >
            June Bills
          </button>
          <button
            className='border-2 border-black w-full h-20 md:h-24 rounded-full text-sm md:text-base font-medium hover:bg-gray-100 transition-colors'
            onClick={() => navigate('/july-history')}
          >
            July Bills
          </button>
        </div>
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
        <Route path="/consumer" element={<ConsumerTable/>} />
        <Route path="/billgenerator" element={<BillGeneratorMerged/>} />
        <Route path="/june-history" element={<JunePaymentStatusList/>} />
        <Route path="/july-history" element={<JulyPaymentStatusList/>} />
      </Routes>
    </Router>
  );
};

export default App;
