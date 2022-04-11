import React, { useState } from 'react';
import { TableRow } from './TableRow';
import { PopUp } from '../PopUp';
import { usePartyContext } from '../contexts/PartyContext';
import './index.css';

export const Table = () => {
  const { orderAmount, collectedMoney, moneyToCollect, filteredBillList, partyInfo } =
    usePartyContext();
  const [userId, setUserId] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.target);
    setUserId(event.target.closest('.row').dataset.name);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const isOpenPopUp = !!anchorEl;

  let infObj = {};
  for (let i = 0; i < partyInfo.length; i++) {
    if (partyInfo[i].name === userId) {
      infObj = partyInfo[i];
      break;
    }
  }

  const totalTable = filteredBillList.map(({ name, isVegan, isPaid, shareToPay }, index) => {
    return (
      <TableRow
        key={index + 'table row'}
        name={name}
        isVegan={isVegan}
        isPaid={isPaid}
        shareToPay={shareToPay}
        isOpenPopUp={isOpenPopUp}
        handlePopoverOpen={handlePopoverOpen}
        handlePopoverClose={handlePopoverClose}
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
      <PopUp
        isOpenPopUp={isOpenPopUp}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        infObj={infObj}
      />
    </table>
  );
};
