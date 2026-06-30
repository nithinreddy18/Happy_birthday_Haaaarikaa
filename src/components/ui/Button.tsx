import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  return (
    <button
      className={`px-6 py-3 rounded-full bg-gradient-to-r from-pinkPrimary to-rose text-white font-poppins shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-0.5 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
