import React, { useState } from 'react';
import consumerData from './Consumer_Bill.json';
import QRImage from '../QR.jpg';
import HeaderImage from '../HeaderImage.png';

function EnglishBillWithMonth() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConsumers, setFilteredConsumers] = useState([]);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredConsumers(
      consumerData.filter((c) =>
        c.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSelectConsumer = (consumer) => {
    setSelectedConsumer(consumer);
    setSearchTerm(consumer.name);
    setFilteredConsumers([]);
    setError('');
    setAmount('');
  };

  const handleReset = () => {
    setSelectedConsumer(null);
    setSearchTerm('');
    setAmount('');
    setError('');
    setSelectedMonth('');
    setFilteredConsumers([]);
  };

  const copyTextToClipboard = () => {
    if (!selectedConsumer || !amount || !selectedMonth) {
      alert("Please select a consumer, enter an amount, and choose a month.");
      return;
    }
    const message = `Hello 🙏,\n${selectedConsumer.name},\nThis is a polite reminder from HariPriya Dairy Farm. Your ${selectedMonth} month milk bill of ₹${amount} is pending.\nKindly pay before 5th of August 2025 to continue uninterrupted service.\nPlease ignore if already paid.\nThank you!\n— Haripriya Dairy Farm`;
    navigator.clipboard.writeText(message);
    alert('📋 Bill text copied to clipboard.');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white">
      {/* Input Fields */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter consumer name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border rounded"
          />
          {filteredConsumers.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full rounded shadow max-h-40 overflow-auto">
              {filteredConsumers.map((consumer) => (
                <li
                  key={consumer.name}
                  onClick={() => handleSelectConsumer(consumer)}
                  className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
                >
                  {consumer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Month Dropdown */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">-- Select Month --</option>
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        {/* Amount Field */}
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹ Enter amount"
          className="px-3 py-2 border rounded"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Bill Preview */}
      {selectedConsumer && (
        <div className="bg-white border p-4 rounded shadow-md text-sm text-gray-800 leading-6">
          <div className="text-center mb-2">
            <img src={HeaderImage} alt="Header" className="w-24 mx-auto mb-1" />
            <h2 className="text-xl font-bold font-sans mt-2">HARIPRIYA DAIRY FARM UDHYOG</h2>
            <h2 className="text-lg font-sans">DEOGARH, RAJASTHAN</h2>
            <h2 className="text-lg font-sans">9257707555 / 7374985777</h2>
          </div>

          <p>Hello 🙏,</p>
          <p className="mt-1"><strong>{selectedConsumer.name}</strong>,</p>
          <p className="mt-2">
            This is a polite reminder from HariPriya Dairy Farm. Your {selectedMonth || '____'} month milk bill of <strong>₹{amount || '____'}</strong> is pending.
          </p>
          <p className="mt-2">
            Kindly pay before 5th of August 2025 to continue uninterrupted service.
            <br />Please ignore this message if already paid.
          </p>
          <p className="mt-2">
            Thank you for your support!
            <br />— Haripriya Dairy Farm
          </p>

          <div className="text-center mt-4">
            <p className="font-semibold text-sm mb-1">Scan QR to Pay:</p>
            <img src={QRImage} alt="QR Code" className="w-36 mx-auto" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {selectedConsumer && (
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={copyTextToClipboard}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            📄 Copy Bill Text
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            🔄 Reset
          </button>
          <a
            href={`https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(
              `Hello 🙏,\n${selectedConsumer.name},\nThis is a polite reminder from HariPriya Dairy Farm. Your ${selectedMonth || '____'} month milk bill of ₹${amount} is pending.\nKindly pay before 5th of August 2025 to continue uninterrupted service.\nPlease ignore if already paid.\nThank you!\n— Haripriya Dairy Farm`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600 text-center"
          >
            📞 Share on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export default EnglishBillWithMonth;
