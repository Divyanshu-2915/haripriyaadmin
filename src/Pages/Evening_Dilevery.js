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

    let content = `Evening Delivery Checklist\n\nCompleted:\n`;
    completed.forEach((item, index) => {
      content += `${index + 1}. ${item.quantity} ${item.name}\n`;
    });

    content += `\nRemaining:\n`;
    remaining.forEach((item, index) => {
      content += `${index + 1}. ${item.quantity} ${item.name}\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "evening-checklist.txt");
  };

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateQuantities = () => {
    let oneLitre = 0;
    let halfLitre = 0;

    list.forEach(item => {
      const qty = item.quantity.replace(/\s+/g, '').replace(/[️⃣]/g, '');

      if (qty === "1") oneLitre += 1;
      else if (qty === "1/2") halfLitre += 1;
      else if (qty === "1+1/2" || qty === "1+½") {
        oneLitre += 1;
        halfLitre += 1;
      } else if (qty === "2") oneLitre += 2;
      else if (qty === "1-1/2" || qty === "1-½") {
        oneLitre += 1;
        halfLitre += 1;
      }
    });

    return { oneLitre, halfLitre };
  };

  const { oneLitre, halfLitre } = calculateQuantities();

  return (
    <div className="w-full max-w-screen-sm lg:max-w-screen-md mx-auto p-4 mt-6 bg-white rounded-xl shadow-lg">
      {/* Header and Quantity */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <div>
          <h1 className="text-xl font-bold">🗓️ Evening Delivery Checklist</h1>
          <p className="text-sm text-gray-600 mt-1">
            🧮 Count → 1 Litre: <strong>{oneLitre}</strong> | 1/2 Litre: <strong>{halfLitre}</strong>
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={resetChecklist}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Reset
          </button>
          <button
            onClick={downloadChecklist}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Checklist Items */}
      <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 mb-6">
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

      {/* Entry Form */}
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
