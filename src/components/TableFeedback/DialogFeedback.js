import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddInputs } from '../AddInputs';
import { Feedback } from '../Feedback';
import { MESSAGES } from '../constants';

export const DialogFeedback = ({
  isOpen,
  setIsOpen,
  name,
  nameId,
  starId,
  getStars,
  isLocal,
  comment,
  phoneNumb,
  display,
  setCountFeedback,
}) => {
  const { btnDelete, btnSave } = MESSAGES.dialogFeedback.buttons;
  const starLength = [0, 1, 2, 3, 4];
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
  };

  const onSubmit = (data) => {
    data.name = `${name}`;
    data.stars = `${starId}`;
    localStorage.setItem(`${nameId}`, JSON.stringify(data));
    reset();
    handleClose();
    setCountFeedback((prev) => prev + 1);
  };

  const deleteFeedback = (e) => {
    if (e.target.name === btnDelete) {
      isLocal && localStorage.removeItem(`${nameId}`);
      isLocal && handleClose();
      setCountFeedback((prev) => prev - 1);
    }
  };

  return (
    <Dialog open={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0',
            width: '400px',
            fontWeight: 'bold',
            pl: '0',
            color: 'grey.700',
          }}
          value={name}
        >
          {name}
          <Typography gutterBottom>{isLocal ? 'feedback' : 'Please, add your feedback'}</Typography>
          <DialogContent dividers onClick={getStars} sx={{ pl: '0' }}>
            {starLength.map((star, index) => (
              <StarIcon
                id={index}
                key={index}
                className="star"
                sx={{
                  color: starId >= index ? '#ffc400' : '',
                  cursor: 'pointer',
                }}
              />
            ))}
          </DialogContent>
          {!isLocal && <AddInputs />}
          {isLocal && <Feedback comment={comment} phoneNumb={phoneNumb} />}
          <Box>
            <TextField
              sx={{ width: '100%', display: `${display}` }}
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
            {errors.phone && !isLocal && (
              <p style={{ fontSize: '14px', textAlign: 'center', color: 'grey.600', pl: '25px' }}>
                Please, use only +(), space, and numbers
              </p>
            )}
            {!errors.phone && !isLocal && <p style={{ height: '16px' }}></p>}
            <TextField
              sx={{ margin: '0 auto', width: '100%', minWidth: '340px', display: `${display}` }}
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
            {errors.comment && !isLocal && (
              <p style={{ fontSize: '14px', textAlign: 'center', color: 'grey.600' }}>
                Please, add min: 10 letters, max: 100 letters
              </p>
            )}
            {!errors.comment && !isLocal && <p style={{ height: '16px' }}></p>}
          </Box>

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
              Close
            </Button>
            <Button
              type="submit"
              autoFocus
              variant="contained"
              color={isLocal ? 'error' : 'success'}
              icon={isLocal ? <DeleteIcon /> : <SendIcon />}
              onClick={deleteFeedback}
              name={isLocal ? btnDelete : btnSave}
            >
              {isLocal ? btnDelete : btnSave}
            </Button>
          </DialogActions>
        </DialogTitle>
      </form>
    </Dialog>
  );
};
