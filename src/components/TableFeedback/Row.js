import { ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

export const Row = ({ onClick, item, isOpenPopUp, handlePopoverOpen, handlePopoverClose }) => (
  <ListItem disablePadding>
    <ListItemButton
      onClick={onClick}
      disabled={!item.isEatsPizza}
      sx={{ p: '8px 0' }}
      className="row"
      data-name={item.name}
      aria-owns={isOpenPopUp ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <ListItemIcon>
        {!item.isEatsPizza && <ClearIcon fontSize="large" />}
        {item.isEatsPizza && item.isFeedback && (
          <CheckCircleOutlineIcon fontSize="large" color="success" />
        )}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          color: `${item.isVegan && item.isEatsPizza ? 'green' : 'grey'}`,
          fontWeight: 'bold',
          variant: 'body1',
        }}
        primary={item.name}
      />
    </ListItemButton>
  </ListItem>
);
