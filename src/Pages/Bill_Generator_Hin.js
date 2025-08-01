import React, { useState, useRef } from 'react';
import consumerData from './Consumer_Bill.json';
import QRImage from '../QR.jpg';        // Place in src folder
import HeaderImage from '../HeaderImage.png';  // Place in src folder

function HindiBill() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const billRef = useRef(null);

  const handleSearch = () => {
    const match = consumerData.find(consumer =>
      consumer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match) {
      setSelectedConsumer(match);
      setError('');
      setAmount('');
    } else {
      setSelectedConsumer(null);
      setError('No consumer found.');
    }
  };

  const handleReset = () => {
    setSelectedConsumer(null);
    setSearchTerm('');
    setAmount('');
    setError('');
  };

  const copyMessage = () => {
    if (!selectedConsumer || !amount.trim()) {
      alert("कृपया उपभोक्ता खोजें और राशि दर्ज करें।");
      return;
    }

    const message = `नमस्ते 🙏, ${selectedConsumer.name},\n\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी जुलाई माह की दूध बिल  ₹${amount} बकाया है। कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।\n\n यदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।\n\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`;

    navigator.clipboard.writeText(message)
      .then(() => alert("📋 संदेश क्लिपबोर्ड में कॉपी हो गया!"))
      .catch(() => alert("संदेश कॉपी करने में विफल।"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="ग्राहक का नाम दर्ज करें"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          खोजें
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div
        ref={billRef}
        className="bg-white border p-4 rounded shadow-md text-sm text-gray-800 leading-6"
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
      >
        {selectedConsumer && (
          <>
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
            <p className="mt-1">
              <strong>{selectedConsumer.name}</strong>,
            </p>
            <p className="mt-2">
              यह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी जुलाई माह की दूध बिल <strong>₹{amount || '____'}</strong> बकाया है।
              <br/>
                  कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।
            </p>
            <p className="mt-2">
              यदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।
            </p>
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
          </>
        )}
      </div>

      {selectedConsumer && (
        <>
          <div className="mt-4">
            <label className="font-medium text-sm">राशि दर्ज करें:</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹0.00"
              className="ml-2 px-3 py-1 border rounded w-32"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={copyMessage}
              className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              📋 Copy Message
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              🔄 Reset
            </button>
            <a
              href={`https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(
                ` नमस्ते 🙏, ${selectedConsumer.name},\n\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी जुलाई माह की दूध बिल ₹${amount} बकाया है।  कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।\n\nयदि भुगतान पहले ही कर दिया है तो कृपया इस संदेश को नज़रअंदाज़ करें।\n\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center"
            >
              📲 Share On WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default HindiBill;