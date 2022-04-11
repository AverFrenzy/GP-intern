import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogActions, Typography, TextField, Box, Button, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddInputs } from '../AddInputs';
import { Feedback } from '../Feedback';
import { MESSAGES } from '../constants';
import { usePartyContext } from '../contexts/PartyContext';
import { TableTitle, FormFeedback, ErrorText } from './Table.styles';

export const DialogFeedback = ({ isOpen, setIsOpen, setCountFeedback, infObj }) => {
  const { isFeedback, feedbackInf, name } = infObj;
  const { handleFeedback } = usePartyContext();
  const { phone, textField } = MESSAGES.dialogFeedback.errorText;
  const { btnDelete, btnSave, btnClose } = MESSAGES.dialogFeedback.buttons;
  const { feedback, defaultFeedback } = MESSAGES.dialogFeedback.title;
  const [stars, setStars] = useState(3);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      stars: '',
    },
  });
  watch('name', 'phone', 'comment');

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setStars(3);
  };

  const onSubmit = (data) => {
    data.name = `${name}`;
    data.stars = `${stars}`;
    setCountFeedback((prev) => prev + 1);
    handleFeedback(name, data);
    setStars(3);
    reset();
    handleClose();
  };

  const deleteFeedback = (e) => {
    if (e.target.name === btnDelete) {
      handleClose();
      setCountFeedback((prev) => prev - 1);
      handleFeedback(name);
    }
  };

  return (
    <Dialog open={isOpen}>
      <FormFeedback onSubmit={handleSubmit(onSubmit)}>
        <TableTitle>{name}</TableTitle>
        <Typography>{isFeedback ? feedback : defaultFeedback}</Typography>
        <Rating
          name="simple-controlled"
          value={!isFeedback ? stars : Number(feedbackInf.stars)}
          onChange={(e, newValue) => {
            setStars(newValue);
          }}
          readOnly={isFeedback}
          sx={{ color: '#ffc400' }}
        />
        {!isFeedback && <AddInputs />}
        {isFeedback && <Feedback comment={feedbackInf.comment} phoneNumb={feedbackInf.phone} />}
        {!isFeedback && (
          <Box>
            <TextField
              sx={{ width: '100%' }}
              id="filled-basic"
              label="Phone number"
              variant="filled"
              color="success"
              autoComplete="off"
              {...register('phone', {
                required: true,
                minLength: 3,
                maxLength: 10,
                pattern: /^[0-9/+/(/)/ /]+$/i,
              })}
            />
            {errors.phone && <ErrorText>{phone}</ErrorText>}
            {!errors.phone && <ErrorText />}
            <TextField
              sx={{ margin: '0 auto', width: '100%', minWidth: '340px' }}
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
              variant="filled"
              color="success"
              {...register('comment', {
                required: true,
                minLength: 10,
                maxLength: 100,
              })}
            />
            {errors.comment && <ErrorText>{textField}</ErrorText>}
            {!errors.comment && <ErrorText />}
          </Box>
        )}

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '75%',
            alignItems: 'center',
          }}
        >
          <Button
            type="reset"
            variant="contained"
            autoFocus
            color="error"
            icon={<CloseIcon />}
            onClick={handleClose}
          >
            {btnClose}
          </Button>
          <Button
            type="submit"
            autoFocus
            variant="contained"
            color={isFeedback ? 'error' : 'success'}
            icon={isFeedback ? <DeleteIcon /> : <SendIcon />}
            onClick={deleteFeedback}
            name={isFeedback ? btnDelete : btnSave}
          >
            {isFeedback ? btnDelete : btnSave}
          </Button>
        </DialogActions>
      </FormFeedback>
    </Dialog>
  );
};
