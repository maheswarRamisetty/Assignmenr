import React, { useState } from 'react';

function AddWidgetModal({ onClose, onSubmit }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleSubmit = () => {
    onSubmit(widgetName, widgetText);
    setWidgetName('');
    setWidgetText('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Widget</h3>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Widget Text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;
