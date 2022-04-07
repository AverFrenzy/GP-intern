import React from 'react';

import './index.css';
import { Table } from '../Table';
import { Pizza } from '../Pizza';


const Dashboard = () => {
  return (
    <>
      <div className='dashboard-container'>
        <div className='dashboard-item'>
          <Table />
        </div>
        <div className='dashboard-item'>
          {/*//*/ }
        </div>
        <div className='dashboard-item'>
          <div className='dashboard-statistic-item'>
            <Pizza />
          </div>
          <div className='dashboard-statistic-item'>
            <Pizza />
          </div>
          <div className='dashboard-statistic-item'>
            <Pizza />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;