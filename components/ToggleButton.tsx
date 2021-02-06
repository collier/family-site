import { useState, MouseEvent } from 'react';
import cx from 'classnames';

type Props = {
  onText: string;
  offText: string;
  defaultValue?: boolean;
  onClick?: (e: MouseEvent, newValue: boolean) => void;
};

export default function ToggleButton({
  onText,
  offText,
  onClick,
  defaultValue = false,
}: Props) {
  const [isOn, setIsOn] = useState(defaultValue);

  const handleClick = (event: MouseEvent) => {
    setIsOn(!isOn);
    if (onClick) {
      onClick(event, !isOn);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        'block w-full px-5 py-2 border border-transparent shadow-sm text-xl font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        {
          'bg-green-400 hover:bg-green-500 text-white': isOn,
          'bg-gray-300 hover:bg-gray-400': !isOn,
        }
      )}
    >
      {isOn ? onText : offText}
    </button>
  );
}
