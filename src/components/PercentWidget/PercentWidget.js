import { CircularProgress } from '@mui/material';
import { PercentBox, PercentBoxTitle, PercentTitle } from './PercentWidget.styles';

export const PercentWidget = ({ value }) => {
  return (
    <PercentBox>
      <CircularProgress
        variant="determinate"
        value={100}
        size="140px"
        thickness={7}
        sx={{ position: 'absolute', color: '#d8d8d8' }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        color={value < 45 ? 'error' : value < 65 && value > 44 ? 'secondary' : 'success'}
        size="140px"
        thickness={7}
      />
      <PercentBoxTitle>
        <PercentTitle>{value}%</PercentTitle>
      </PercentBoxTitle>
    </PercentBox>
  );
};
