import { Popover } from '@mui/material';
import { MESSAGES } from '../constants';
import { Feedback } from '../Feedback';
import { PopUpText, PopUpRating, PopUpBox, PopUpDivider, PopUpTitle } from './PopUp.styles';

export const PopUp = ({ anchorEl, handlePopoverClose, isOpenPopUp, infObj }) => {
  const { order, feedback } = MESSAGES.popupText;
  const { isFeedback, isPaid, feedbackInf, toPay } = infObj;

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
      <PopUpBox>
        {!isFeedback && <PopUpText>{feedback.default}</PopUpText>}
        {isFeedback && (
          <>
            <PopUpRating name="read-only" value={+feedbackInf.stars + 1} readOnly />
            <Feedback comment={feedbackInf.comment} phoneNumb={feedbackInf.phone} />
          </>
        )}
        <PopUpDivider />
        {!isPaid && <PopUpText>{order.default}</PopUpText>}
        {isPaid && (
          <>
            <PopUpTitle>Paid</PopUpTitle>
            <PopUpText>{toPay.toFixed(1)} BYN</PopUpText>
          </>
        )}
      </PopUpBox>
    </Popover>
  );
};
