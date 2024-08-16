import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Category from './Category';
import SearchBar from './SearchBar';
import BulkActions from './BulkActions';
import AddWidgetPopup from './AddWidgetPopup'; 
const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const categories = useSelector(state => state.dashboard.categories);
  const searchTerm = useSelector(state => state.dashboard.searchTerm);

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const handleAddWidgetClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Dashboard</h1>
        <AddWidgetButton onClick={handleAddWidgetClick}>Add Widget</AddWidgetButton>
      </DashboardHeader>
      <SearchBar />
      {filteredCategories.map(category => (
        <Category key={category.id} category={category} />
      ))}
      <BulkActions />
      {isPopupOpen && <AddWidgetPopup onClose={() => setIsPopupOpen(false)} />}
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 60px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddWidgetButton = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export default Dashboard;