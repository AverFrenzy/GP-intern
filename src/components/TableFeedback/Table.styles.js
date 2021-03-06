import styled from 'styled-components';

export const TableTitle = styled.h2`
  font-weight: 700;
  padding-bottom: 15px;
  color: #616161;
  text-align: center;
  text-transform: uppercase;
`;

export const TableList = styled.ul`
  width: 100%;
  margin: 10px auto;
  padding: 0 85px;
  border: 1px solid #616161;
  border-radius: 2px;
`;

export const FormFeedback = styled.form`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-width: 360px;
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: red;
  padding: 8px 0;
  min-height: 32px;
`;
