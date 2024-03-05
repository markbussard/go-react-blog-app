import { forwardRef } from "react";
import { type FieldError } from "react-hook-form";

import { cn } from "~/utils";

export type TextAreaProps = {
  error?: FieldError;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { className, error, ...rest } = props;
    return (
      <textarea
        ref={ref}
        autoCapitalize="none"
        autoCorrect="off"
        className={cn(
          `w-full rounded-md border-0 py-2.5 pl-5 pr-5 ring-1 ring-inset ${
            error ? "ring-red-500" : "ring-gray-300"
          } placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset ${
            error ? "focus:ring-red-500" : "focus:ring-gray-500"
          }`,
          className,
        )}
        {...rest}
      />
    );
  },
);

TextArea.displayName = "TextArea";
// className={cn(
//   `block h-10 w-full rounded-md border-0 py-2.5 pr-5 ${
//     startIcon ? "pl-14" : "pl-5"
//   } ring-1 ring-inset ${
//     error ? "ring-red-500" : "ring-gray-300"
//   } placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset ${
//     error ? "focus:ring-red-500" : "focus:ring-gray-500"
//   }`,
//   className,
// )}
