import React, { useState, useRef } from 'react';
import consumerData from './Consumer_Bill_List.json';
import QRImage from '../QR.jpg';
import HeaderImage from '../HeaderImage.png';

function BillGeneratorMerged() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConsumers, setFilteredConsumers] = useState([]);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showBills, setShowBills] = useState(false);
  const billRef = useRef(null);

  // Live search functionality
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredConsumers([]);
      return;
    }

    const filtered = consumerData.filter((consumer) =>
      consumer.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredConsumers(filtered);
  };

  const handleSelectConsumer = (consumer) => {
    setSelectedConsumer(consumer);
    setSearchTerm(consumer.name);
    setFilteredConsumers([]);
    setError('');
    setShowBills(false);
  };

  const handleGenerateBills = () => {
    if (!selectedConsumer || !amount.trim() || !selectedMonth) {
      setError('Please select a consumer, enter an amount, and choose a month.');
      return;
    }
    setError('');
    setShowBills(true);
  };

  const handleReset = () => {
    setSelectedConsumer(null);
    setSearchTerm('');
    setAmount('');
    setSelectedMonth('');
    setError('');
    setFilteredConsumers([]);
    setShowBills(false);
  };

  const copyEnglishMessage = () => {
    const message = `Hello 🙏,\n${selectedConsumer.name},\nThis is a polite reminder from HariPriya Dairy Farm. Your ${selectedMonth} month milk bill of ₹${amount} is pending.\nKindly pay before 5th of August 2025 to continue uninterrupted service.\nPlease ignore if already paid.\nThank you!\n— Haripriya Dairy Farm`;
    navigator.clipboard.writeText(message);
    alert('📋 English bill text copied to clipboard.');
  };

  const copyHindiMessage = () => {
    const message = `नमस्ते 🙏,\n${selectedConsumer.name},\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी ${selectedMonth} माह की दूध बिल ₹${amount} बकाया है। कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।\nयदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`;
    navigator.clipboard.writeText(message);
    alert('📋 हिंदी बिल टेक्स्ट क्लिपबोर्ड में कॉपी हो गया!');
  };

  const sendWhatsAppEnglish = () => {
    if (!selectedConsumer.phone) {
      alert('Phone number not available for this consumer.');
      return;
    }
    const message = `Hello 🙏,\n${selectedConsumer.name},\nThis is a polite reminder from HariPriya Dairy Farm. Your ${selectedMonth} month milk bill of ₹${amount} is pending.\nKindly pay before 5th of August 2025 to continue uninterrupted service.\nPlease ignore if already paid.\nThank you!\n— Haripriya Dairy Farm`;
    const whatsappUrl = `https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendWhatsAppHindi = () => {
    if (!selectedConsumer.phone) {
      alert('Phone number not available for this consumer.');
      return;
    }
    const message = `नमस्ते 🙏,\n${selectedConsumer.name},\nयह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी ${selectedMonth} माह की दूध बिल ₹${amount} बकाया है। कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।\nयदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।\nआपके सहयोग के लिए धन्यवाद!\n— हरिप्रिया डेयरी फार्म`;
    const whatsappUrl = `https://wa.me/91${selectedConsumer.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

    const printBills = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill Print - ${selectedConsumer.name}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none !important; }
            }
            body { font-family: Arial, sans-serif; margin: 20px; }
            .bill-container { max-width: 800px; margin: 0 auto; }
            .bill-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .bill-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .bill-subtitle { font-size: 16px; color: #666; }
            .bills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px; }
            .bill-card { border: 2px solid #333; padding: 20px; border-radius: 10px; background: #f9f9f9; }
            .bill-card h3 { text-align: center; margin-bottom: 20px; font-size: 18px; }
            .bill-details { margin-bottom: 20px; }
            .bill-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .bill-label { font-weight: bold; }
            .bill-message { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; line-height: 1.6; }
            .bill-message strong { color: #333; }
            @media (max-width: 768px) {
              .bills-grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="bill-container">
            <div class="bill-header">
              <div class="bill-title">HARIPRIYA DAIRY FARM</div>
              <div class="bill-subtitle">Bill Generation - ${selectedMonth} ${new Date().getFullYear()}</div>
            </div>
            
            <div class="bills-grid">
              <div class="bill-card">
                <h3>English Bill</h3>
                <div class="bill-details">
                  <div class="bill-row">
                    <span class="bill-label">Consumer:</span>
                    <span>${selectedConsumer.name}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">Month:</span>
                    <span>${selectedMonth}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">Amount:</span>
                    <span><strong>₹${amount}</strong></span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">Phone:</span>
                    <span>${selectedConsumer.phone || 'N/A'}</span>
                  </div>
                </div>
                <div class="bill-message">
                  Hello 🙏,<br/>
                  <strong>${selectedConsumer.name}</strong>,<br/>
                  This is a polite reminder from HariPriya Dairy Farm. Your <strong>${selectedMonth}</strong> month milk bill of <strong>₹${amount}</strong> is pending.<br/>
                  Kindly pay before 5th of August 2025 to continue uninterrupted service.<br/>
                  Please ignore if already paid.<br/>
                  Thank you!<br/>
                  — Haripriya Dairy Farm
                </div>
              </div>
              
              <div class="bill-card">
                <h3>हिंदी बिल</h3>
                <div class="bill-details">
                  <div class="bill-row">
                    <span class="bill-label">उपभोक्ता:</span>
                    <span>${selectedConsumer.name}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">माह:</span>
                    <span>${selectedMonth}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">राशि:</span>
                    <span><strong>₹${amount}</strong></span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">फोन:</span>
                    <span>${selectedConsumer.phone || 'N/A'}</span>
                  </div>
                </div>
                <div class="bill-message">
                  नमस्ते 🙏,<br/>
                  <strong>${selectedConsumer.name}</strong>,<br/>
                  यह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी <strong>${selectedMonth}</strong> माह की दूध बिल <strong>₹${amount}</strong> बकाया है।<br/>
                  कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।<br/>
                  यदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।<br/>
                  आपके सहयोग के लिए धन्यवाद!<br/>
                  — हरिप्रिया डेयरी फार्म
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
              Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
  };

  const saveAsImage = () => {
    // Create a new window for image capture
    const imageWindow = window.open('', '_blank');
    const imageContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill Image - ${selectedConsumer.name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              background: white;
              width: 800px;
              height: 600px;
            }
            .bill-container { 
              max-width: 800px; 
              margin: 0 auto; 
              background: white;
              padding: 20px;
            }
            .bill-header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #333; 
              padding-bottom: 20px; 
            }
            .bill-title { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 10px; 
            }
            .bill-subtitle { 
              font-size: 16px; 
              color: #666; 
            }
            .bills-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 30px; 
              margin-top: 30px; 
            }
            .bill-card { 
              border: 2px solid #333; 
              padding: 20px; 
              border-radius: 10px; 
              background: #f9f9f9; 
            }
            .bill-card h3 { 
              text-align: center; 
              margin-bottom: 20px; 
              font-size: 18px; 
            }
            .bill-details { 
              margin-bottom: 20px; 
            }
            .bill-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 8px; 
            }
            .bill-label { 
              font-weight: bold; 
            }
            .bill-message { 
              background: white; 
              padding: 15px; 
              border-radius: 5px; 
              border: 1px solid #ddd; 
              line-height: 1.6; 
            }
            .bill-message strong { 
              color: #333; 
            }
          </style>
        </head>
        <body>
          <div class="bill-container">
            <div class="bill-header">
              <div class="bill-title">HARIPRIYA DAIRY FARM</div>
              <div class="bill-subtitle">Bill Generation - ${selectedMonth} ${new Date().getFullYear()}</div>
            </div>
            
            <div class="bills-grid">
              <div class="bill-card">
                <h3>English Bill</h3>
                <div class="bill-details">
                  <div class="bill-row">
                    <span class="bill-label">Consumer:</span>
                    <span>${selectedConsumer.name}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">Month:</span>
                    <span>${selectedMonth}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">Amount:</span>
                    <span><strong>₹${amount}</strong></span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">Phone:</span>
                    <span>${selectedConsumer.phone || 'N/A'}</span>
                  </div>
                </div>
                <div class="bill-message">
                  Hello 🙏,<br/>
                  <strong>${selectedConsumer.name}</strong>,<br/>
                  This is a polite reminder from HariPriya Dairy Farm. Your <strong>${selectedMonth}</strong> month milk bill of <strong>₹${amount}</strong> is pending.<br/>
                  Kindly pay before 5th of August 2025 to continue uninterrupted service.<br/>
                  Please ignore if already paid.<br/>
                  Thank you!<br/>
                  — Haripriya Dairy Farm
                </div>
              </div>
              
              <div class="bill-card">
                <h3>हिंदी बिल</h3>
                <div class="bill-details">
                  <div class="bill-row">
                    <span class="bill-label">उपभोक्ता:</span>
                    <span>${selectedConsumer.name}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">माह:</span>
                    <span>${selectedMonth}</span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">राशि:</span>
                    <span><strong>₹${amount}</strong></span>
                  </div>
                  <div class="bill-row">
                    <span class="bill-label">फोन:</span>
                    <span>${selectedConsumer.phone || 'N/A'}</span>
                  </div>
                </div>
                <div class="bill-message">
                  नमस्ते 🙏,<br/>
                  <strong>${selectedConsumer.name}</strong>,<br/>
                  यह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी <strong>${selectedMonth}</strong> माह की दूध बिल <strong>₹${amount}</strong> बकाया है।<br/>
                  कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।<br/>
                  यदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।<br/>
                  आपके सहयोग के लिए धन्यवाद!<br/>
                  — हरिप्रिया डेयरी फार्म
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
              Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </div>
          </div>
        </body>
      </html>
    `;
    
    imageWindow.document.write(imageContent);
    imageWindow.document.close();
    
    // Instructions for user
    imageWindow.onload = function() {
      alert('📸 To save as image:\n\n1. Right-click on the bill\n2. Select "Save image as..." or "Save picture as..."\n3. Choose your preferred location and save\n\nOr use browser extensions like "Screenshot" or "Nimbus" to capture the page as an image.');
    };
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bill Generator</h1>
        <p className="text-gray-600">Generate bills in both Hindi and English</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Consumer Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumer Name
            </label>
            <input
              type="text"
              placeholder="Search consumer name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {filteredConsumers.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md shadow-lg max-h-40 overflow-auto">
                {filteredConsumers.map((consumer) => (
                  <li
                    key={consumer.id}
                    onClick={() => handleSelectConsumer(consumer)}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium">{consumer.name}</div>
                    {consumer.phone && (
                      <div className="text-sm text-gray-500">{consumer.phone}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Month Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Select Month --</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleGenerateBills}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Generate Bills
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Bills Display Section */}
      {showBills && selectedConsumer && (
        <div className="bg-white rounded-lg shadow-md p-6" ref={billRef}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Generated Bills</h2>
                         <div className="flex gap-3">
               <button
                 onClick={printBills}
                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
               >
                 🖨️ Print Bills
               </button>
               <button
                 onClick={saveAsImage}
                 className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
               >
                 📸 Save as Image
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* English Bill */}
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
            <img src={HeaderImage} alt="" className='justify-self-center w-36 h-44'/>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">HariPriya Dairy Farm Bill</h3>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={copyEnglishMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    📋 Copy Text
                  </button>
                  <button
                    onClick={sendWhatsAppEnglish}
                    disabled={!selectedConsumer.phone}
                    className={`px-4 py-2 rounded-md transition-colors text-sm ${
                      selectedConsumer.phone 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                    title={selectedConsumer.phone ? 'Send WhatsApp message' : 'Phone number not available'}
                  >
                    📱 WhatsApp
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Consumer:</span>
                  <span>{selectedConsumer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Month:</span>
                  <span>{selectedMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span className="font-bold">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{selectedConsumer.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded border">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Hello 🙏,<br/>
                  <strong>{selectedConsumer.name}</strong>,<br/>
                  This is a polite reminder from HariPriya Dairy Farm. Your <strong>{selectedMonth}</strong> month milk bill of <strong>₹{amount}</strong> is pending.<br/>
                  Kindly pay before 5th of August 2025 to continue uninterrupted service.<br/>
                  Please ignore if already paid.<br/>
                  Thank you!<br/>
                  — Haripriya Dairy Farm
                </p>
              </div>
            </div>

            {/* Hindi Bill */}
            <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
            <img src={HeaderImage} alt="" className='justify-self-center w-36 h-44'/>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">हरिप्रिया डेयरी फार्म बिल</h3>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={copyHindiMessage}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    📋 टेक्स्ट कॉपी करें
                  </button>
                  <button
                    onClick={sendWhatsAppHindi}
                    disabled={!selectedConsumer.phone}
                    className={`px-4 py-2 rounded-md transition-colors text-sm ${
                      selectedConsumer.phone 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                    title={selectedConsumer.phone ? 'WhatsApp पर संदेश भेजें' : 'फोन नंबर उपलब्ध नहीं है'}
                  >
                    📱 WhatsApp
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">उपभोक्ता:</span>
                  <span>{selectedConsumer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">माह:</span>
                  <span>{selectedMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">राशि:</span>
                  <span className="font-bold">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">फोन:</span>
                  <span>{selectedConsumer.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded border">
                <p className="text-sm text-gray-700 leading-relaxed">
                  नमस्ते 🙏,<br/>
                  <strong>{selectedConsumer.name}</strong>,<br/>
                  यह हरिप्रिया डेयरी फार्म की ओर से एक विनम्र अनुरोध है। आपकी <strong>{selectedMonth}</strong> माह की दूध बिल <strong>₹{amount}</strong> बकाया है।<br/>
                  कृपया असुविधा से बचने हेतु 5 अगस्त 2025 से पहले भुगतान करें।<br/>
                  यदि आपने पहले ही भुगतान कर दिया है, तो कृपया इस संदेश को नज़रअंदाज़ करें।<br/>
                  आपके सहयोग के लिए धन्यवाद!<br/>
                  — हरिप्रिया डेयरी फार्म
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default BillGeneratorMerged; 