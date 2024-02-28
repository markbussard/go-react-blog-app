import { forwardRef } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <button
        type="button"
        className="mt-4 text-ellipsis bg-cyan-100 text-blue-300"
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
