import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addWidget,removeSelectedWidgets } from '../features/dashboardSlice'; 

const AddWidgetPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const handleWidgetToggle = (categoryId, widgetId) => {
    setSelectedWidgets(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [widgetId]: !prev[categoryId]?.[widgetId]
      }
    }));
  };

  const handleAddWidgets = () => {
    // Object.entries(selectedWidgets).forEach(([categoryId, widgets]) => {
    //   Object.entries(widgets).forEach(([widgetId, isSelected]) => {
    //     if (isSelected) {
    //       dispatch(addWidget({ categoryId, widgetId }));
    //     }
    //   });
    // });
    dispatch(removeSelectedWidgets());
    onClose();
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <h2>Add Widgets</h2>
        {categories.map(category => (
          <CategorySection key={category.id}>
            <h3>{category.name}</h3>
            {category.widgets.map(widget => (
              <WidgetCheckbox key={widget.id}>
                <input
                  type="checkbox"
                  checked={selectedWidgets[category.id]?.[widget.id] || false}
                  onChange={() => handleWidgetToggle(category.id, widget.id)}
                />
                <span>{widget.name}</span>
              </WidgetCheckbox>
            ))}
          </CategorySection>
        ))}
        <ButtonGroup>
          <Button onClick={handleAddWidgets}>Add Selected Widgets</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </PopupContent>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const CategorySection = styled.div`
  margin-bottom: 20px;
`;

const WidgetCheckbox = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

export default AddWidgetPopup;