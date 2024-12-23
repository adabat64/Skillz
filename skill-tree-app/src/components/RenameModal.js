import React from 'react';

function RenameModal({ 
  title, 
  value, 
  onChange, 
  onSave, 
  onCancel 
}) {
  return (
    <div className='rename-modal'>
      <div className='modal-content'>
        <h3>{title}</h3>
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default RenameModal;
