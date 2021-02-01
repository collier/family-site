type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export default function DateInput({ name, defaultValue, placeholder }: Props) {
  return (
    <input
      type="date"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    />
  );
}
