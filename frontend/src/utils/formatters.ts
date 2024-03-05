// Formatted as January 14, 2024
export const formatDate = (
  date: Date | string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString(undefined, options);
};

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
