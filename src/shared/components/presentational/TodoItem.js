import React, { PropTypes } from 'react';

export default function TodoItem({ editable = false, btnStyle = {}, onDelete, onEdit, children }) {
  return (
    <div style={btnStyle}>
      {children}
      {editable &&
        <span>
          <button style={btnStyle} onClick={onDelete}>X</button>
          <button style={btnStyle} onClick={onEdit}>Edit</button>
        </span>
      }
    </div>
  );
}

TodoItem.propTypes = {
  editable: PropTypes.bool,
  btnStyle: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit:   PropTypes.func,
  children: PropTypes.any,
};
