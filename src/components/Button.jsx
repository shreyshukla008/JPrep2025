export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};