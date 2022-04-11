import React from 'react';

import './index.css';

export const ListFilter = ({ options, setFilterQuery }) => {
  return (
    <select className="filter-list" onChange={(event) => setFilterQuery(event.target.value)}>
      <option className="filter-list-item" defaultValue value={''}>
        ALL
      </option>
      {options.map((option, index) => (
        <option className="filter-list-item" key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
