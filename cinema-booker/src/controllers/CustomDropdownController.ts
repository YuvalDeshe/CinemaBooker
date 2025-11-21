export function useCustomDropdownController(
  onChange?: (value: string) => void
) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (onChange) onChange(newValue);
  };

  return {
    handleChange,
  };
}
