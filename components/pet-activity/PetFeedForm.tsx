import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

import FormGroup from '@/components/FormGroup';
import FormGroupError from '@/components/FormGroupError';
import SelectInput from '@/components/SelectInput';
import Input from '@/components/Input';

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
  const { register, handleSubmit, errors } = useForm<PetFeedFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormGroup label="Pet">
        <SelectInput name="petId" ref={register}>
          <option value="RIESLING">Riesling</option>
          <option value="KODA">Koda</option>
        </SelectInput>
      </FormGroup>
      <FormGroup label="Scoops" helpText='A "scoop" is ½ a cup.'>
        <Input
          type="number"
          name="dryFoodScoops"
          step="0.1"
          min="0.1"
          max="9.9"
          inputMode="decimal"
          hasError={!!errors.dryFoodScoops}
          ref={register({
            required: true,
            valueAsNumber: true,
            pattern: /^\d{1}$|^\d+\.\d{0,1}$/,
          })}
        />
        {errors.dryFoodScoops?.type === 'pattern' && (
          <FormGroupError text="Must be a number between 0 and 10 with at most one decimal place." />
        )}
        {errors.dryFoodScoops?.type === 'required' && (
          <FormGroupError text="Required" />
        )}
      </FormGroup>
      <FormGroup label="Feed Date">
        <Input
          type="date"
          name="feedDate"
          hasError={!!errors.feedDate}
          ref={register({ required: true })}
        />
        {errors.feedDate?.type === 'required' && (
          <FormGroupError text="Required" />
        )}
      </FormGroup>
      <FormGroup label="Feed Time">
        <Input
          type="date"
          name="feedTime"
          hasError={!!errors.feedTime}
          ref={register({ required: true })}
        />
        {errors.feedTime?.type === 'required' && (
          <FormGroupError text="Required" />
        )}
      </FormGroup>
      {children}
    </form>
  );
}
