import React, { useState, useRef } from 'react';
import consumerData from './Consumer_Bill.json';
import QRImage from '../QR.jpg';        // Place in src folder
import HeaderImage from '../HeaderImage.png';  // Place in src folder
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function HindiBill() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const billRef = useRef(null);

  // 🔍 Search for consumer
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

  // 🧹 Reset the form
  const handleReset = () => {
    setSelectedConsumer(null);
    setSearchTerm('');
    setAmount('');
    setError('');
  };

  // 📄 Download bill as PDF
  const downloadPDF = async () => {
    if (!selectedConsumer || !amount.trim()) {
      alert("Please search a user and enter an amount.");
      return;
    }

    const canvas = await html2canvas(billRef.current, {
      scale: 8,
      useCORS: true,
      scrollY: -window.scrollY,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
  orientation: 'p',              // 'p' for portrait, 'l' for landscape
  unit: '',                    // units: 'mm', 'cm', 'in', 'px'
  format: [5000, 5000]  // Width and height in chosen unit
});
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedConsumer.name.replace(/\s/g, '_')}_MilkBill.pdf`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter consumer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Bill (to be exported to PDF) */}
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
                style={{
                  width: '100px',
                  height: 'auto',
                  margin: '0 auto',
                  display: 'block',
                }}
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
              यह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुस्मारक है। आपकी इस माह की दूध की राशि <strong>₹{amount || '____'}</strong> बकाया है।
            </p>
            <p className="mt-2">
              कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।
              <br />
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
                style={{
                  width: '160px',
                  height: '160px',
                  objectFit: 'contain',
                  margin: '0 auto',
                  display: 'block',
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Amount Input + Buttons */}
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
              onClick={downloadPDF}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              📄 PDF डाउनलोड करें
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              🔄 रीसेट
            </button>
            <a
              href={`https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(
                `नमस्ते 🙏, ${selectedConsumer.name},\n\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुस्मारक है। आपकी इस माह की दूध की राशि ₹${amount} बकाया है। कृपया 5 अगस्त 2025 से पहले भुगतान करें।\n\nयदि भुगतान पहले ही कर दिया है तो कृपया इस संदेश को नज़रअंदाज़ करें।\n\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center"
            >
              📲 WhatsApp पर भेजें
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default HindiBill;
