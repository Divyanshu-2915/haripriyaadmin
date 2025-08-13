import React, { useState, useEffect } from 'react';
import data from './June_Payments.json';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function JunePaymentStatusList() {
  // Load fresh data from JSON file each time
  const [list, setList] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  // Save to localStorage whenever list changes (with unique key for June)
  useEffect(() => {
    localStorage.setItem('juneConsumerList', JSON.stringify(list));
  }, [list]);

  const updatePaymentStatus = (id, status) => {
    const updatedList = list.map(user =>
      user.id === id ? { ...user, paymentStatus: status === 'Payment Done' } : user
    );
    setList(updatedList);
  };

  const updateAmount = (id, amount) => {
    const updatedList = list.map(user =>
      user.id === id ? { ...user, amount: amount } : user
    );
    setList(updatedList);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = filteredList.map(user => [
      user.name,
      user.phone || 'N/A',
      user.amount || 'N/A',
      user.paymentStatus ? 'Payment Done' : 'Payment Remaining',
      user.product || 'N/A'
    ]);

    autoTable(doc, {
      head: [['Name', 'Phone', 'Total Amount', 'Payment Status', 'Product']],
      body: tableData,
      styles: {
        cellWidth: 'wrap',
        halign: 'left'
      },
      didParseCell: function (data) {
        if (data.column.index === 3) {
          if (data.cell.raw === 'Payment Done') {
            data.cell.styles.textColor = [0, 128, 0]; // green
          } else {
            data.cell.styles.textColor = [255, 0, 0]; // red
          }
        }
      }
    });

    doc.save('Payment_Status_List.pdf');
  };

  const filteredList = list.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredList.reduce((sum, user) => {
    return sum + (parseFloat(user.amount) || 0);
  }, 0);

  const receivedAmount = filteredList.reduce((sum, user) => {
    return sum + (user.paymentStatus ? (parseFloat(user.amount) || 0) : 0);
  }, 0);

  // Optional: Download updated data as JSON
  const downloadData = () => {
    const dataStr = JSON.stringify(list, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'June_Consumer_List.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Reset to fresh data from JSON
  const resetToFreshData = () => {
    localStorage.removeItem('juneConsumerList');
    setList(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">💸 June Payment Status List</h1>
      <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
        <p className="text-sm">
          <strong>Note:</strong> Some consumers may have empty amount fields. 
          You can update amounts by editing the table below or use the "Reset to Fresh Data" button to reload from JSON.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <table className="w-full table-auto border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Total Amount</th>
            <th className="border px-4 py-2 text-left">Payment Status</th>
            <th className="border px-4 py-2 text-left">Product</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.phone || 'N/A'}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={user.amount || ''}
                  onChange={(e) => updateAmount(user.id, e.target.value)}
                  placeholder="Enter amount"
                  className="w-20 px-2 py-1 border rounded text-center"
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  value={user.paymentStatus ? 'Payment Done' : 'Payment Remaining'}
                  onChange={(e) => updatePaymentStatus(user.id, e.target.value)}
                  className={`px-2 py-1 border rounded focus:outline-none ${user.paymentStatus ? 'text-green-600' : 'text-red-600'}`}
                >
                  <option value="Payment Remaining">Payment Remaining</option>
                  <option value="Payment Done">Payment Done</option>
                </select>
              </td>
              <td className="border px-4 py-2">{user.product || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4 text-sm text-gray-700">
        <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        <p><strong>Amount Received:</strong> ₹{receivedAmount}</p>
        <p><strong>Total Consumers:</strong> {filteredList.length}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={downloadData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          💾 Download JSON
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          📄 Download PDF
        </button>
        <button
          onClick={resetToFreshData}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          🔄 Reset to Fresh Data
        </button>
      </div>
    </div>
  );
}

export default JunePaymentStatusList;
