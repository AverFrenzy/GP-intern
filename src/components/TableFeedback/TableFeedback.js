import { useState, useEffect } from 'react';
import { Row } from './Row';
import { DialogFeedback } from './DialogFeedback';
import { PopUp } from '../PopUp';
import { usePartyContext } from '../contexts/PartyContext';
import { TableList } from './Table.styles';

export const TableFeedback = () => {
  const { countPercentFeedback, feedbackListInfo, partyInfo } = usePartyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [countFeedback, setCountFeedback] = useState(0);
  const [userId, setUserId] = useState();

  useEffect(() => {
    countPercentFeedback(countFeedback);
  }, [countFeedback, countPercentFeedback]);

  const handleClickOpen = (e) => {
    setIsOpen(true);
  };

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

  return (
    <>
      <TableList>
        {feedbackListInfo.map((item) => (
          <Row
            onClick={handleClickOpen}
            key={item.name}
            item={item}
            isOpenPopUp={isOpenPopUp}
            handlePopoverOpen={handlePopoverOpen}
            handlePopoverClose={handlePopoverClose}
          />
        ))}
      </TableList>
      <DialogFeedback
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCountFeedback={setCountFeedback}
        infObj={infObj}
      />
      <PopUp
        isOpenPopUp={isOpenPopUp}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        infObj={infObj}
      />
    </>
  );
};
