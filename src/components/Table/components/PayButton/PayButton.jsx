import { usePartyContext } from '../../../contexts/PartyContext';
import './index.css';

export const PayButton = ({ participantName, isPaid }) => {
  const { pay } = usePartyContext();

  return (
    <button
      onClick={() => pay(participantName)}
      disabled={isPaid}
      className={isPaid ? 'pay-button pay-button-unactive' : 'pay-button'}
    >
      {isPaid ? 'PAID' : 'PAY'}
    </button>
  );
};
