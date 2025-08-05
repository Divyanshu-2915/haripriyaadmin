import React, { useState, useEffect } from 'react';
import data from './Evening_List.json';
import { saveAs } from 'file-saver';

function EveningChecklist() {
  const [list, setList] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("1/2 litre");
  const [newDeliverer, setNewDeliverer] = useState("");
  const [oneLitreCount, setOneLitreCount] = useState(0);
  const [halfLitreCount, setHalfLitreCount] = useState(0);

  useEffect(() => {
    calculateQuantities();
  }, [list]);

  const calculateQuantities = () => {
    let one = 0;
    let half = 0;

    list.forEach(item => {
      const qty = item.quantity.replace(/\s+/g, '').toLowerCase();
      if (qty === "1" || qty === "1litre") one += 1;
      else if (qty === "1/2" || qty === "1/2litre") half += 1;
      else if (qty === "1+1/2" || qty === "1+1/2litre") {
        one += 1;
        half += 1;
      } else if (qty === "2") one += 2;
      else if (qty === "2+1/2") {
        one += 2;
        half += 1;
      } else if (qty === "3") one += 3;
      else if (qty === "3+1/2") {
        one += 3;
        half += 1;
      } else if (qty === "4") one += 4;
      else if (qty === "4+1/2") {
        one += 4;
        half += 1;
      } else if (qty === "5") one += 5;
    });

    setOneLitreCount(one);
    setHalfLitreCount(half);
  };

  const toggleCheck = (id) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const toggleBottleReturn = (id) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, bottleReturned: !item.bottleReturned } : item
    ));
  };

  const resetChecklist = () => {
    setList(prev => prev.map(item => ({
      ...item,
      completed: false,
      bottleReturned: false,
      delivered_by: ""
    })));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (newName.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: newName,
      quantity: newQuantity,
      completed: false,
      bottleReturned: false,
      delivered_by: newDeliverer || ""
    };

    setList(prev => [...prev, newItem]);
    setNewName("");
    setNewQuantity("1/2 litre");
    setNewDeliverer("");
  };

  const updateQuantity = (id, newQty) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const updateDeliverer = (id, deliverer) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, delivered_by: deliverer } : item
    ));
  };

  const downloadChecklist = () => {
    const completed = list.filter(item => item.completed);
    const remaining = list.filter(item => !item.completed);

    let content = `Evening Delivery Checklist\n\nDelivered (${completed.length}):\n`;
    completed.forEach((item, index) => {
      content += `  ${index + 1}. ${item.name} - ${item.quantity} ${item.bottleReturned ? "(bottle returned)" : "(bottle not returned)"} Delivered by: ${item.delivered_by || "N/A"}\n`;
    });

    content += `\nRemaining (${remaining.length}):\n`;
    remaining.forEach((item, index) => {
      content += `  ${index + 1}. ${item.name} - ${item.quantity} ${item.bottleReturned ? "(bottle returned)" : "(bottle not returned)"} Delivered by: ${item.delivered_by || "N/A"}\n`;
    });

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}-${now.getFullYear()}`;
    const filename = `${formattedDate} Evening Delivery.txt`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-screen-sm lg:max-w-screen-md mx-auto p-4 mt-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">🗓️ Evening Delivery Checklist</h1>
        <div>
          <p className="text-sm">1 Litre: {oneLitreCount}</p>
          <p className="text-sm">1/2 Litre: {halfLitreCount}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={resetChecklist} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Reset</button>
        <button onClick={downloadChecklist} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Download</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
      />

      <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 mb-6">
        {filteredList.map((item) => (
          <li key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
            <div className="flex-1 text-sm sm:text-base mb-1 sm:mb-0">
              <span className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.name}</span>
            </div>

            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              className="text-sm px-2 py-1 border rounded bg-white mr-2"
            >
            <option value="Quantity">Quantity</option>
              <option value="1/2">1/2</option>
              <option value="1">1</option>
              <option value="1+1/2">1+1/2</option>
              <option value="2">2</option>
              <option value="2+1/2">2+1/2</option>
              <option value="3">3</option>
              <option value="3+1/2">3+1/2</option>
              <option value="4">4</option>
              <option value="4+1/2">4+1/2</option>
              <option value="5">5</option>
            </select>

            <select
              value={item.delivered_by || ""}
              onChange={(e) => updateDeliverer(item.id, e.target.value)}
              className="text-sm px-2 py-1 border rounded bg-white mr-2"
            >
              <option value="">By</option>
              <option value="C">C</option>
              <option value="P">P</option>
              <option value="D">D</option>
            </select>

            <div className="flex gap-3 items-center mt-2 sm:mt-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCheck(item.id)}
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm">Delivered</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.bottleReturned}
                  onChange={() => toggleBottleReturn(item.id)}
                  className="form-checkbox h-4 w-4 text-yellow-500"
                />
                <span className="text-sm">Bottle</span>
              </label>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddEntry} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
            required
          />
          <select
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded"
          >
          <option value="Quantity">Quantity</option>
            <option value="1/2">1/2</option>
            <option value="1">1</option>
            <option value="1+1/2">1+1/2</option>
            <option value="2">2</option>
            <option value="2+1/2">2+1/2</option>
            <option value="3">3</option>
            <option value="3+1/2">3+1/2</option>
            <option value="4">4</option>
            <option value="4+1/2">4+1/2</option>
            <option value="5">5</option>
          </select>
          <select
            value={newDeliverer}
            onChange={(e) => setNewDeliverer(e.target.value)}
            className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">By</option>
            <option value="C">C</option>
            <option value="P">P</option>
            <option value="D">D</option>
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
