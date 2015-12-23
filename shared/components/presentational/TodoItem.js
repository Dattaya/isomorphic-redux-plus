import React from 'react';

export default function ({editable = false, btnStyle = {}, handleDelete, handleEdit, children}) {
  return (
    <div style={btnStyle}>
      <span>{children}</span>
      {editable &&
      <span>
        <button style={btnStyle} onClick={handleDelete}>X</button>
        <button style={btnStyle} onClick={handleEdit}>Edit</button>
      </span>
      }
    </div>
  );
}
