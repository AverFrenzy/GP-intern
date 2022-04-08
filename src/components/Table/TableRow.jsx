import { useState } from 'react';
import { PayButton } from './components/PayButton';
import { PopUp } from '../PopUp';

export const TableRow = ({ name, isVegan, isPaid, shareToPay }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.target);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const isOpenPopUp = !!anchorEl;

  return (
    <>
      <tr>
        <td
          className={isVegan ? 'vegan-text' : null}
          aria-owns={isOpenPopUp ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {name}
        </td>
        <td>{`${shareToPay ? shareToPay.toFixed(1) : 0} BYN`}</td>
        <td>
          <PayButton participantName={name} isPaid={isPaid} />
        </td>
      </tr>
      <PopUp
        isOpenPopUp={isOpenPopUp}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        tableName={'order'}
        nameUser={name}
      />
    </>
  );
};
