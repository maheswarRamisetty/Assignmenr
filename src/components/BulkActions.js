import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeSelectedWidgets } from '../features/dashboardSlice';

const BulkActions = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories);

  const selectedWidgetsCount = categories.reduce((count, category) => {
    return count + category.widgets.filter(widget => widget.selected).length;
  }, 0);

  const handleRemoveSelected = () => {
    dispatch(removeSelectedWidgets());
  };

  if (selectedWidgetsCount === 0) {
    return null;
  }

  return (
    <BulkActionsContainer>
      <p>{selectedWidgetsCount} widget(s) selected</p>
      <RemoveSelectedButton onClick={handleRemoveSelected}>
        Remove Selected Widgets
      </RemoveSelectedButton>
    </BulkActionsContainer>
  );
};

const BulkActionsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveSelectedButton = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
`;

export default BulkActions;