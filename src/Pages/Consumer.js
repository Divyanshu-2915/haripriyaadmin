import React, { useState } from 'react';
import consumerData from './Consumer_List.json';

const ConsumerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConsumers = consumerData.filter(consumer =>
    consumer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">👥 Consumer List</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Product</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsumers.map(consumer => (
              <tr key={consumer.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">{consumer.name}</td>
                <td className="px-4 py-2">{consumer.phone || "-"}</td>
                <td className="px-4 py-2">{consumer.product}</td>
              </tr>
            ))}
            {filteredConsumers.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">No matching results.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsumerTable;
