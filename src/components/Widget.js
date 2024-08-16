import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeWidget, toggleWidgetSelection } from '../features/dashboardSlice';

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const handleToggleSelection = () => {
    dispatch(toggleWidgetSelection({ categoryId, widgetId: widget.id }));
  };

  return (
    <WidgetContainer selected={widget.selected}>
      <RemoveButton onClick={handleRemove}>&times;</RemoveButton>
      <Checkbox
        type="checkbox"
        checked={widget.selected}
        onChange={handleToggleSelection}
      />
      <h3>{widget.name}</h3>
      <p>{widget.content}</p>
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div`
  background-color: ${props => props.selected ? '#e6f7ff' : '#f0f0f0'};
  padding: 15px;
  border-radius: 5px;
  position: relative;
  border: ${props => props.selected ? '2px solid #1890ff' : 'none'};
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ff0000;
`;

const Checkbox = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export default Widget;