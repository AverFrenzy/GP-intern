import React from 'react';

import { usePartyContext } from '../contexts/PartyContext';

import './index.css';

const ListFilter = ({ options, listName }) => {
  const { filterList } = usePartyContext();
  return (
    <select className="filter-list" onChange={(event) => filterList(event.target.value, listName)}>
      {/* prettier-ignore */}
      <option className="filter-list-item" defaultValue value={'defaultValue'}>ALL</option>
      {options.map((option, index) => (
        <option className="filter-list-item" key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default ListFilter;
