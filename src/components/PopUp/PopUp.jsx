import React from 'react';
import { Popover } from '@mui/material';
import { MESSAGES } from '../constants';
import { usePartyContext } from '../contexts/PartyContext';
import { PopUpText } from './PopUp.styles';

export const PopUp = ({ anchorEl, handlePopoverClose, isOpenPopUp, tableName, nameUser }) => {
  const { partyInfo } = usePartyContext();
  const { order, feedback } = MESSAGES.popupText;

  let text = '';

  if (tableName === 'feedback') {
    text = feedback.default;
    partyInfo.forEach(({ name, isFeedback, feedbackInf }) => {
      if (name === nameUser) {
        isFeedback ? (text = `${feedbackInf.phone} ${feedbackInf.comment}`) : false;
      }
    });
  }

  if (tableName === 'order') {
    text = order.default;
    partyInfo.forEach(({ name, isPaid }) => {
      if (name === nameUser) {
        isPaid ? (text = 'Paid') : false;
      }
    });
  }

  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={isOpenPopUp}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <PopUpText>{text}</PopUpText>
    </Popover>
  );
};
