import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleClick = (feature) => {
    if (feature === 'scoring') {
      navigate('/admin/scoring'); // Only one implemented for now
    } else {
      alert(`${feature} is not implemented yet`);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Features</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          key='scoring'
          onClick={() => handleClick('scoring')}
          style={{ padding: '12px 24px' }}
        >
          scoring
        </button>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => handleClick(`feature-${i}`)}
            style={{ padding: '12px 24px' }}
          >
            feature-{i}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Admin;
