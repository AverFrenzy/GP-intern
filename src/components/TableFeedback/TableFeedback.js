import { useState, useEffect } from 'react';
import { Row } from './Row';
import { DialogFeedback } from './DialogFeedback';
import { usePartyContext } from '../contexts/PartyContext';
import { TableList } from './Table.styles';

export const TableFeedback = () => {
  const { countPercentFeedback, feedbackListInfo } = usePartyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [starId, setStarId] = useState(2);
  const [isLocal, setIsLocal] = useState(false);
  const [comment, setComment] = useState('');
  const [phoneNumb, setPhoneNumb] = useState('');
  const [countFeedback, setCountFeedback] = useState(0);

  useEffect(() => {
    countPercentFeedback(countFeedback);
  }, [countFeedback, countPercentFeedback]);

  const getStars = (e) => {
    if (e.target.closest('svg[id]') && !isLocal) {
      const id = e.target.closest('svg[id]').id;
      setStarId(id);
    }
  };

  const handleClickOpen = (e) => {
    const id = e.currentTarget.id;
    setId(id);
    if (localStorage.getItem(`${id}`)) {
      const { stars, comment, phone } = JSON.parse(localStorage.getItem(`${id}`));
      setIsLocal(true);
      setStarId(+stars);
      setComment(comment);
      setPhoneNumb(phone);
    } else {
      setIsLocal(false);
      setStarId(2);
      setComment('');
      setPhoneNumb('');
    }
    setIsOpen(true);
  };

  return (
    <>
      <TableList>
        {feedbackListInfo.map(({ name, isEatsPizza, isFeedback }, index) => (
          <Row
            onClick={handleClickOpen}
            color={
              feedbackListInfo[index].isVegan && feedbackListInfo[index].isEatsPizza
                ? 'green'
                : 'grey.800'
            }
            name={name}
            disabled={!isEatsPizza}
            key={name}
            id={index}
            visibility={isEatsPizza && !isFeedback ? 'hidden' : false}
          />
        ))}
      </TableList>
      <DialogFeedback
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        name={id ? feedbackListInfo[id].name : ''}
        nameId={id}
        starId={starId}
        getStars={getStars}
        isLocal={isLocal}
        comment={comment}
        phoneNumb={phoneNumb}
        display={isLocal ? 'none' : false}
        setCountFeedback={setCountFeedback}
      />
    </>
  );
};
