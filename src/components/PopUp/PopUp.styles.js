import styled from 'styled-components';
import { Rating } from '@mui/material';

export const PopUpBox = styled.div`
  padding: 30px 15px;
  width: 360px;
`;

export const PopUpText = styled.p`
  padding: 8px 30px 15px;
  font-size: 20px;
  color: #616161;
  font-weight: 700;
`;

export const PopUpTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  padding: 8px 30px 0;
  color: #ffc400;
`;

export const PopUpRating = styled(Rating)`
  padding: 0 30px 0;
  color: #ffc400;
`;

export const PopUpDivider = styled.hr`
  border-top: 2px solid #ffc400;
  border-bottom: none;
`;
