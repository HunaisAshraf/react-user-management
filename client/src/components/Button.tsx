type Btn = {
  children: JSX.Element | string;
  onClick: () => void;
};

const Button = ({ children, onClick }: Btn) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white font-semibold py-1 px-2 rounded-sm"
    >
      {children}
    </button>
  );
};

export default Button;
