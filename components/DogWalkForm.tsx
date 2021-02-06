import { PropsWithChildren } from 'react';
import { useForm, Controller } from 'react-hook-form';

import DateInput from '@/components/DateInput';
import FormGroup from '@/components/FormGroup';
import SelectInput from '@/components/SelectInput';
import TimeInput from '@/components/TimeInput';
import ToggleButton from '@/components/ToggleButton';

export type DogWalkFormData = {
  petId: string;
  didPee: boolean;
  didPoop: boolean;
  walkDate: string;
  walkTime: string;
};

type Props = PropsWithChildren<{
  defaultValues: Partial<DogWalkFormData>;
  onSubmit: (data: DogWalkFormData) => void;
}>;

export function DogWalkForm({ defaultValues, onSubmit, children }: Props) {
  const { register, handleSubmit, control } = useForm<DogWalkFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Pet">
        <SelectInput name="petId" ref={register}>
          <option value="RIESLING">Riesling</option>
          <option value="KODA">Koda</option>
        </SelectInput>
      </FormGroup>
      <FormGroup label="Waste">
        <div className="flex space-x-2">
          <Controller
            control={control}
            name="didPee"
            render={(props) => (
              <ToggleButton
                onText="Pee 💦"
                offText="No Pee"
                defaultValue={props.value}
                onClick={(e, newValue) => props.onChange(newValue)}
              />
            )}
          />
          <Controller
            control={control}
            name="didPoop"
            render={(props) => (
              <ToggleButton
                onText="Poop 💩"
                offText="No Poop"
                defaultValue={props.value}
                onClick={(e, newValue) => props.onChange(newValue)}
              />
            )}
          />
        </div>
      </FormGroup>
      <FormGroup label="Walk Date">
        <DateInput name="walkDate" ref={register} />
      </FormGroup>
      <FormGroup label="Walk Time">
        <TimeInput name="walkTime" ref={register} />
      </FormGroup>
      {children}
    </form>
  );
}
