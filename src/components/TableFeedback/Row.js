import { useState } from 'react';
import { ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { PopUp } from '../PopUp';

export const Row = ({ color, disabled, visibility, name, onClick, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.target);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const isOpenPopUp = !!anchorEl;

  return (
    <ListItem disablePadding>
      <ListItemButton
        id={id}
        onClick={onClick}
        disabled={disabled}
        sx={{ p: '8px 0' }}
        aria-owns={isOpenPopUp ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ListItemIcon sx={{ visibility: `${visibility}` }}>
          {disabled && <ClearIcon fontSize="large" />}
          {!disabled && <CheckCircleOutlineIcon fontSize="large" color="success" />}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: `${color}`,
            fontWeight: 'bold',
            variant: 'body1',
          }}
          primary={name}
        />
      </ListItemButton>
      <PopUp
        isOpenPopUp={isOpenPopUp}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        tableName={'feedback'}
        nameUser={name}
      />
    </ListItem>
  );
};
