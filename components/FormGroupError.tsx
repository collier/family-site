type Props = {
  text: string;
}

export default function FormGroupError({ text }: Props) {
  return (
    <p className="mt-2 text-sm text-red-600">{text}</p>
  )
}