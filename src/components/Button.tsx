interface ButtonProps {
  props: {
    name: string;
    text: string;
    color: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };
}

export default function Button({ props }: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`btn ${props.color} ${props.name}`}
    >
      {props.text}
    </button>
  );
}
