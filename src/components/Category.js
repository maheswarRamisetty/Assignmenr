import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addWidget, removeSelectedWidgets } from '../features/dashboardSlice';
import Widget from './Widget';

const Category = ({ category }) => {
  const dispatch = useDispatch();
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetContent, setNewWidgetContent] = useState('');

  const handleAddWidget = () => {
    if (newWidgetName && newWidgetContent) {
      dispatch(addWidget({
        categoryId: category.id,
        widget: { name: newWidgetName, content: newWidgetContent },
      }));
      setNewWidgetName('');
      setNewWidgetContent('');
    }
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelectedWidgets());
  };

  return (
    <CategoryContainer>
      <h2>{category.name}</h2>
      <WidgetGrid>
        {category.widgets.map(widget => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
      </WidgetGrid>
      <AddWidgetForm>
        <input
          type="text"
          placeholder="Widget Name"
          value={newWidgetName}
          onChange={(e) => setNewWidgetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Widget Content"
          value={newWidgetContent}
          onChange={(e) => setNewWidgetContent(e.target.value)}
        />
        <button onClick={handleAddWidget}>Add Widget</button>
      </AddWidgetForm>
      <RemoveSelectedButton onClick={handleRemoveSelected}>
        Remove Selected Widgets
      </RemoveSelectedButton>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  margin-bottom: 30px;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const AddWidgetForm = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 5px;
  }

  button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const RemoveSelectedButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
`;

export default Category;