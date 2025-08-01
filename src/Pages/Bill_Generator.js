import React, { useState, useRef } from 'react';
import consumerData from './Consumer_List.json';
import QRImage from '../QR.jpg';        // Place in src folder
import HeaderImage from '../HeaderImage.png';  // Place in src folder
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function BillSearch() {
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
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
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
      <div ref={billRef} className="bg-white border p-4 rounded shadow-md text-sm text-gray-800 leading-6">
        {selectedConsumer && (
          <>
            <div className="text-center mb-2">
              <img src={HeaderImage} alt="Header" className="w-24 mx-auto mb-1" />
              <h2 className="text-xl font-bold mt-2">Haripriya Dairy Farm</h2>
            </div>

            <p>Hello 🙏,</p>
            <p className="mt-1">
              <strong>{selectedConsumer.name}</strong> ({selectedConsumer.phone}),
            </p>
            <p className="mt-2">
              This is a reminder that the milk delivery amount for this month is <strong>₹{amount || '____'}</strong>.
            </p>
            <p className="mt-2">
              Kindly pay the amount and close the bill at your earliest convenience.
              <br />
              Please ignore this message if you have already made the payment.
            </p>
            <p className="mt-2">
              Thank you for your support!
              <br />— Haripriya Dairy Farm
            </p>

            <div className="text-center mt-4">
              <p className="font-semibold text-sm mb-1">Scan QR to Pay:</p>
              <img src={QRImage} alt="QR Code" className="w-36 mx-auto" />
            </div>
          </>
        )}
      </div>

      {/* Amount Input + Buttons */}
      {selectedConsumer && (
        <>
          <div className="mt-4">
            <label className="font-medium text-sm">Enter Amount:</label>
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
              📄 Download PDF
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              🔄 Reset
            </button>
            <button>
              <a
  href={`https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(
    `Hello 🙏, ${selectedConsumer.name},\n\nThis is a reminder that the milk delivery amount for this month is ₹${amount}.\n\nKindly pay the amount and close the bill at your earliest convenience.\nPlease ignore this message if you have already made the payment.\n\nThank you for your support!\n— Haripriya Dairy Farm`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center"
>
  📲 Share on WhatsApp
</a>

            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BillSearch;
