import React, { useEffect, useState } from 'react';

const ListEditor = ({ title, items, setItems }) => {
  const [newPrompt, setNewPrompt] = useState('');

  const addPrompt = () => {
    if (newPrompt.trim() === '') return;
    setItems([...items, { text: newPrompt, active: false }]);
    setNewPrompt('');
  };

  const toggleActive = (index) => {
    setItems(items.map((item, i) => ({
      ...item,
      active: i === index,
    })));
  };

  return (
    <div style={{ flex: 1, margin: '0 16px' }}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <label>
              <input
                type="radio"
                checked={item.active}
                onChange={() => toggleActive(idx)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <button onClick={addPrompt}>Add</button>
    </div>
  );
};

const Scoring = () => {
  const [listA, setListA] = useState([]);
  const [listB, setListB] = useState([]);

  const userId = 'UUU-000-000-000';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/scoring`)
      .then(res => res.json())
      .then(data => {
        setListA(data.web_searches || []);
        setListB(data.goose_prompts || []);
      })
      .catch(err => console.error('Failed to fetch prompts:', err));
  }, []);

  const saveChanges = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/scoring`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ web_searches: listA, goose_prompts: listB }),
    })
      .then(res => res.json())
      .then(data => console.log('Test results:', data))
      .catch(err => console.error('Failed to save:', err));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Scoring Admin</h2>
      <div style={{ display: 'flex' }}>
        <ListEditor title="Web Search" items={listA} setItems={setListA} />
        <ListEditor title="Goose Prompt" items={listB} setItems={setListB} />
      </div>
      <button onClick={saveChanges} style={{ marginTop: 24 }}>
        Save & Test
      </button>
    </div>
  );
};

export default Scoring;
