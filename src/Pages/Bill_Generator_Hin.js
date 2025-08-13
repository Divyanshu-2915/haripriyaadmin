import React, { useState, useRef } from 'react';
import consumerData from './Consumer_Bill_List.json';
import QRImage from '../QR.jpg';
import HeaderImage from '../HeaderImage.png';
///8058786786
function HindiBill() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const billRef = useRef(null);

  const filteredConsumers = consumerData.filter(consumer =>
    consumer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectConsumer = (name) => {
    const match = consumerData.find(consumer => consumer.name === name);
    if (match) {
      setSelectedConsumer(match);
      setSearchTerm(name);
      setError('');
      setAmount('');
    }
  };

  const handleReset = () => {
    setSelectedConsumer(null);
    setSearchTerm('');
    setAmount('');
    setMonth('');
    setError('');
  };

  const copyMessage = () => {
    if (!selectedConsumer || !amount.trim() || !month.trim()) {
      alert("कृपया उपभोक्ता खोजें, राशि और माह चुनें।");
      return;
    }

    const message = `नमस्ते 🙏,\n${selectedConsumer.name},\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी ${month} माह की दूध बिल ₹${amount} बकाया है। कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।\nयदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`;

    navigator.clipboard.writeText(message)
      .then(() => alert("📋 संदेश क्लिपबोर्ड में कॉपी हो गया!"))
      .catch(() => alert("संदेश कॉपी करने में विफल।"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white">
      {/* Input Fields */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Name Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="ग्राहक का नाम दर्ज करें"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded w-full"
          />
          {searchTerm && !selectedConsumer && (
            <ul className="absolute z-10 bg-white border w-full rounded shadow max-h-40 overflow-auto text-sm">
              {filteredConsumers.map((consumer) => (
                <li
                  key={consumer.name}
                  className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectConsumer(consumer.name)}
                >
                  {consumer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Month Select */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">--माह चुनें--</option>
          <option value="जनवरी">जनवरी</option>
          <option value="फ़रवरी">फ़रवरी</option>
          <option value="मार्च">मार्च</option>
          <option value="अप्रैल">अप्रैल</option>
          <option value="मई">मई</option>
          <option value="जून">जून</option>
          <option value="जुलाई">जुलाई</option>
          <option value="अगस्त">अगस्त</option>
          <option value="सितंबर">सितंबर</option>
          <option value="अक्टूबर">अक्टूबर</option>
          <option value="नवंबर">नवंबर</option>
          <option value="दिसंबर">दिसंबर</option>
        </select>

        {/* Amount Input */}
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹ राशि दर्ज करें"
          className="px-3 py-2 border rounded"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Bill Display */}
      {selectedConsumer && (
        <div
          ref={billRef}
          className="bg-white border p-4 rounded shadow-md text-sm text-gray-800 leading-6"
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
        >
          <div className="text-center mb-4">
            <img
              src={HeaderImage}
              alt="Header"
              style={{ width: '100px', height: 'auto', margin: '0 auto', display: 'block' }}
            />
            <h2 className="text-xl font-bold font-sans mt-2">HARIPRIYA DAIRY FARM UDHYOG</h2>
            <h2 className="text-lg font-sans">DEOGARH, RAJASTHAN</h2>
            <h2 className="text-lg font-sans">9257707555 / 7374985777</h2>
          </div>

          <p>नमस्ते 🙏,</p>
          <p className="mt-1"><strong>{selectedConsumer.name}</strong>,</p>
          <p className="mt-2">
            यह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी {month} माह की दूध बिल <strong>₹{amount || '____'}</strong> बकाया है।
            <br />
            कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।
          </p>
          <p className="mt-2">यदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।</p>
          <p className="mt-2">
            आपके सहयोग के लिए धन्यवाद!
            <br />— हरिप्रिया डेयरी फार्म
          </p>

          <div className="text-center mt-4">
            <p className="font-semibold text-sm mb-1">QR कोड स्कैन करें:</p>
            <img
              src={QRImage}
              alt="QR Code"
              style={{ width: '160px', height: '160px', objectFit: 'contain', margin: '0 auto', display: 'block' }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {selectedConsumer && (
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={copyMessage}
            className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            📋 संदेश कॉपी करें
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            🔄 रीसेट
          </button>
          <a
            href={`https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(
              `नमस्ते 🙏,\n${selectedConsumer.name},\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी ${month} माह की दूध बिल ₹${amount} बकाया है। कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।\nयदि भुगतान पहले ही कर दिया है तो कृपया इस संदेश को नज़रअंदाज़ करें।\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center"
          >
            📲 WhatsApp पर भेजें
          </a>
        </div>
      )}
    </div>
  );
}

export default HindiBill;
