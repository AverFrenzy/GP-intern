import { PayButton } from './components/PayButton';

export const TableRow = ({
  name,
  isVegan,
  isPaid,
  shareToPay,
  handlePopoverClose,
  handlePopoverOpen,
  isOpenPopUp,
}) => (
  <tr>
    <td
      className={isVegan ? 'vegan-text row' : 'row'}
      data-name={name}
      aria-owns={isOpenPopUp ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      {name}
    </td>
    <td>{`${shareToPay ? shareToPay.toFixed(1) : 0} BYN`}</td>
    <td>
      <PayButton participantName={name} isPaid={isPaid} />
    </td>
  </tr>
);
