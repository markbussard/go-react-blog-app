import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 font-semibold",
  {
    variants: {
      variant: {
        contained: "text-white",
        outlined:
          "bg-white border border-[var(--cva-color)] text-gray-600 bg-white hover:bg-[#F5F5F5]",
        text: "bg-transparent border-none",
      },
      color: {
        primary: "bg-gray-500 text-white",
        secondary: "bg-teal-500 text-white hover:bg-teal-600",
        darkGrey: "bg-white text-gray-600",
      },
      size: {
        small: "h-10 px-3",
        medium: "h-11 px-4",
        large: "h-12 px-8",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: "bg-gray-500 text-white hover:bg-gray-600 border-none",
      },
      {
        variant: "contained",
        color: "secondary",
        className: "bg-teal-500 text-white hover:bg-teal-600",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-2 border-blue-500 bg-white text-blue-500 hover:bg-blue-100",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-2 border-teal-500 bg-white text-teal-500 hover:bg-teal-100",
      },
      {
        variant: "outlined",
        color: "darkGrey",
        className:
          "border-2 border-gray-500 bg-white text-gray-600 hover:bg-gray-100",
      },
      {
        variant: "text",
        color: "primary",
        className: "bg-transparent text-blue-500 hover:bg-blue-100",
      },
      {
        variant: "text",
        color: "secondary",
        className: "bg-transparent text-teal-500 hover:bg-teal-100",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "medium",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, color, variant, size, children, ...rest } = props;
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          buttonVariants({ color, variant, size, className }),
          "border-2",
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
