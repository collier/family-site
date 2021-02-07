import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

import FormGroup from '@/components/FormGroup';
import SelectInput from '@/components/SelectInput';
import NumberInput from '@/components/NumberInput';
import DateInput from '@/components/DateInput';
import TimeInput from '@/components/TimeInput';

export type PetFeedFormData = {
  petId: string;
  dryFoodScoops: number;
  feedDate: string;
  feedTime: string;
};

type Props = PropsWithChildren<{
  defaultValues: Partial<PetFeedFormData>;
  onSubmit: (data: PetFeedFormData) => void;
}>;

export function PetFeedForm({ defaultValues, onSubmit, children }: Props) {
  const { register, handleSubmit } = useForm<PetFeedFormData>({
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
      <FormGroup label="Scoops" helpText="A scoop is 1/2 a cup.">
        <NumberInput
          name="dryFoodScoops"
          ref={register({ pattern: /^\d{1}$|^\d+\.\d{0,1}$/ })}
        />
      </FormGroup>
      <FormGroup label="Feed Date">
        <DateInput name="feedDate" ref={register} />
      </FormGroup>
      <FormGroup label="Feed Time">
        <TimeInput name="feedTime" ref={register} />
      </FormGroup>
      {children}
    </form>
  );
}
