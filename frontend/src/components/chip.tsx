export type ChipProps = {
  children: React.ReactNode;
};

export const Chip = (props: ChipProps) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-800">
      {props.children}
    </span>
  );
};
