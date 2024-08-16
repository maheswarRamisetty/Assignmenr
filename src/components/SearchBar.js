import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSearchTerm } from '../features/dashboardSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.dashboard.searchTerm);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
`;

export default SearchBar;