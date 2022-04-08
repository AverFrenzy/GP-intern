import React from 'react';
import { Popover } from '@mui/material';
import { PopUpText } from './PopUp.styles';
import { MESSAGES } from '../constants';

export const PopUp = ({ anchorEl, handlePopoverClose, isOpenPopUp, infObj }) => {
  const { order, feedback } = MESSAGES.popupText;
  const { isFeedback, isPaid, feedbackInf } = infObj;

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
      {!isFeedback && <PopUpText>{feedback.default}</PopUpText>}
      {isFeedback && <PopUpText>{feedbackInf.comment}</PopUpText>}
      {!isPaid && <PopUpText>{order.default}</PopUpText>}
      {isPaid && <PopUpText>paid</PopUpText>}
    </Popover>
  );
};
