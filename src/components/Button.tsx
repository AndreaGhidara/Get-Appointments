
interface ButtonProps {
  text: string
}

export default function Button({text}: ButtonProps) {
  return (
    <button className="w-full px-4 py-2 bg-blue-800 p-2 rounded-md text-white font-bold">
      {text ?? 'no text'}
    </button>
  )
}
