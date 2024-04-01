type Btn = {
  children: JSX.Element | string;
  onClick: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: Btn) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className ? className : "bg-blue-600"
      } text-white font-semibold py-1 px-2 rounded-sm`}
    >
      {children}
    </button>
  );
};

export default Button;
