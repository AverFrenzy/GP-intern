import React from 'react';
import { TableRow } from './TableRow';
import { usePartyContext } from '../contexts/PartyContext';
import './index.css';

export const Table = () => {
  const { orderAmount, collectedMoney, moneyToCollect, billListInfo } = usePartyContext();

  const totalTable = billListInfo.map(({ name, isVegan, isPaid, shareToPay }, index) => {
    return (
      <TableRow
        key={index + 'table row'}
        name={name}
        isVegan={isVegan}
        isPaid={isPaid}
        shareToPay={shareToPay}
      />
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Share to pay</th>
          <th>Pay</th>
        </tr>
      </thead>
      <tbody>
        {totalTable}
        <tr>
          <td>{'Total order'}</td>
          <td colSpan={2}>{`${orderAmount.toFixed(1)} BYN`}</td>
        </tr>
        <tr>
          <td>{'Money to collect'}</td>
          <td colSpan={2}>{`${Math.abs(moneyToCollect.toFixed(1))} BYN`}</td>
        </tr>
        <tr>
          <td>{'Money collected'}</td>
          <td colSpan={2}>{`${
            collectedMoney ? collectedMoney.toFixed(1) : collectedMoney.toFixed(0)
          } BYN`}</td>
        </tr>
      </tbody>
    </table>
  );
};
