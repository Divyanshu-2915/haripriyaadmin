import React, { useState } from 'react';
import data from './Evening_List.json';
import { saveAs } from 'file-saver';

function EveningChecklist() {
  const [list, setList] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");

  const toggleCheck = (id) => {
    setList(list.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetChecklist = () => {
    setList(list.map(item => ({ ...item, completed: false })));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (newName.trim() === "") return;

    const newItem = {
      id: list.length + 1,
      name: newName,
      quantity: newQuantity,
      completed: false
    };

    setList([...list, newItem]);
    setNewName("");
    setNewQuantity("1");
  };

  const downloadChecklist = () => {
    const completed = list.filter(item => item.completed);
    const remaining = list.filter(item => !item.completed);

    let content = `🗓️ Evening Delivery Checklist\n\n✅ Completed Tasks:\n`;
    completed.forEach((item, index) => {
      content += `${index + 1}. ${item.quantity} ${item.name}\n`;
    });

    content += `\n❌ Remaining Tasks:\n`;
    remaining.forEach((item, index) => {
      content += `${index + 1}. ${item.quantity} ${item.name}\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "morning-checklist.txt");
  };

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🗓️ Evening Delivery Checklist</h1>
        <div className="flex gap-2">
          <button
            onClick={resetChecklist}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Reset
          </button>
          <button
            onClick={downloadChecklist}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      </div>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Checklist */}
      <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 mb-6">
        {filteredList.map((item) => (
          <li key={item.id} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id={`check-${item.id}`}
              checked={item.completed}
              onChange={() => toggleCheck(item.id)}
              className="mr-3 cursor-pointer"
            />
            <label
              htmlFor={`check-${item.id}`}
              className={`flex-1 select-none cursor-pointer ${item.completed ? 'line-through text-gray-500' : ''}`}
            >
              {item.quantity} {item.name}
            </label>
          </li>
        ))}
        {filteredList.length === 0 && (
          <li className="text-gray-500">No matching results.</li>
        )}
      </ul>

      {/* Add New Entry Form */}
      <form onSubmit={handleAddEntry} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <select
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="1/2">1/2</option>
            <option value="1">1</option>
            <option value="1+1/2">1+1/2</option>
            <option value="2">2</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          ➕ Add Entry
        </button>
      </form>
    </div>
  );
}

export default EveningChecklist;
