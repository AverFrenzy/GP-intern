import { useState } from 'react';
import { PayButton } from './components/PayButton';
import { PopUp } from '../PopUp';
import { usePartyContext } from '../contexts/PartyContext';

export const TableRow = ({ name, isVegan, isPaid, shareToPay }) => {
  const { partyInfo } = usePartyContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.target);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const isOpenPopUp = !!anchorEl;

  let infObj = {};
  for (let i = 0; i < partyInfo.length; i++) {
    if (partyInfo[i].name === name) {
      infObj = partyInfo[i];
      break;
    }
  }

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
        infObj={infObj}
      />
    </>
  );
};
