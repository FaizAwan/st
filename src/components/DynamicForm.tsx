"use client"
// components/DynamicForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Row {
  id: number;
  value: string;
}

const DynamicForm: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([{ id: Date.now(), value: '' }]);

  const addRow = () => {
    setRows([...rows, { id: Date.now(), value: '' }]);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, value: event.target.value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(rows);
  };

  return (
    <form onSubmit={handleSubmit}>
      {rows.map((row, index) => (
        <div key={row.id}>
          <input
            type="text"
            value={row.value}
            onChange={(e) => handleChange(row.id, e)}
          />
          <button type="button" onClick={() => deleteRow(row.id)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={addRow}>Add Row</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
