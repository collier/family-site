type Props = {
  name: string;
  placeholder?: string;
};

export default function DateInput({ name, placeholder }: Props) {
  return (
    <input
      type="time"
      name={name}
      placeholder={placeholder}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    />
  );
}
