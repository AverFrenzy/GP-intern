import React from 'react';

import { usePartyContext } from '../contexts/PartyContext';

import { Table } from '../Table';
import { Pizza } from '../Pizza';
import ListFilter from '../ListFilter/ListFilter';
import { TableFeedback } from '../TableFeedback';
import { PercentWidget } from '../PercentWidget';

import './index.css';

const BILL_OPTIONS = [
  { value: 'isVegan', name: 'VEGAN' },
  { value: 'isNotVegan', name: 'MEAT' },
  { value: 'isPaid', name: 'PAID' },
  { value: 'isEatsPizza', name: 'EATS PIZZA' },
];

const FEEDBACK_OPTIONS = [
  { value: 'isVegan', name: 'VEGAN' },
  { value: 'isNotVegan', name: 'MEAT' },
  { value: 'isEatsPizza', name: 'EATS PIZZA' },
];

export const Dashboard = () => {
  const { percentPaid, percentFeedback } = usePartyContext();

  return (
    <div className="dashboard-container">
      <div className="dashboard-item">
        <ListFilter options={BILL_OPTIONS} listName={'billList'} />
        <Table />
      </div>
      <div className="dashboard-item">
        <ListFilter options={FEEDBACK_OPTIONS} listName={'feedbackList'} />
        <TableFeedback />
      </div>
      <div className="dashboard-item">
        <div className="dashboard-statistic-item">
          <Pizza />
        </div>
        <div className="dashboard-statistic-item">
          <PercentWidget value={percentPaid} />
        </div>
        <div className="dashboard-statistic-item">
          <PercentWidget value={percentFeedback} />
        </div>
      </div>
    </div>
  );
};
