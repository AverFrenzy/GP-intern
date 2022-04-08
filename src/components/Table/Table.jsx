import React from 'react';
import { PayButton } from './components/PayButton';
import { usePartyContext } from '../contexts/PartyContext';
import './index.css';

export const Table = () => {
  const { orderAmount, collectedMoney, moneyToCollect, billListInfo } = usePartyContext();

  const totalTable = billListInfo.map((person, index) => {
    return (
      <tr key={index + 'table row'}>
        <td className={person.isVegan ? 'vegan-text' : null} key={index + 'name'}>
          {person.name}
        </td>
        <td key={index + 'number'}>
          {`${person.shareToPay ? person.shareToPay.toFixed(1) : 0} BYN`}
        </td>
        <td key={index + 'pay-button'}>
          <PayButton participantName={person.name} isPaid={person.isPaid} />
        </td>
      </tr>
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
