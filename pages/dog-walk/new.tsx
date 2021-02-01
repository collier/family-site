import { useState, MouseEvent } from 'react';
import cx from 'classnames';
import { format } from 'date-fns';

import FormGroup from '@/components/FormGroup';
import DateInput from '@/components/DateInput';
import TimeInput from '@/components/TimeInput';
import SelectInput from '@/components/SelectInput';
import Button from '@/components/Button';

type ToggleButtonProps = {
  onText: string;
  offText: string;
  defaultValue?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function ToggleButton({ onText, offText, defaultValue = false }: ToggleButtonProps) {
  const [isOn, setIsOn] = useState(defaultValue);
  return (
    <button
      type="button"
      onClick={() => setIsOn(!isOn)}
      className={cx(
        'block w-full px-5 py-2 border border-transparent shadow-sm text-xl font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        {
          'bg-green-400 hover:bg-green-500 text-white': isOn,
          'bg-gray-200 hover:bg-gray-300': !isOn,
        }
      )}
    >
      {isOn ? onText : offText}
    </button>
  );
}

export default function NewDogWalkPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(event);
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold font-lora uppercase">Add Dog Walk</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup label="Pet">
          <SelectInput name="petId">
            <option>Riesling</option>
            <option>Koda</option>
          </SelectInput>
        </FormGroup>
        <FormGroup label="Waste">
          <div className="flex space-x-2">
            <ToggleButton onText="Pee 💦" offText="No Pee" defaultValue={true} />
            <ToggleButton onText="Poop 💩" offText="No Poop" />
          </div>
        </FormGroup>
        <FormGroup label="Walk Date">
          <DateInput name="walkDate" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
        </FormGroup>
        <FormGroup label="Walk Time">
          <TimeInput name="walkTime" defaultValue={format(new Date(), 'HH:mm')} />
        </FormGroup>
        <Button type="submit" size="lg" loading={isLoading}>
          Submit Walk
        </Button>
      </form>
    </div>
  );
}
