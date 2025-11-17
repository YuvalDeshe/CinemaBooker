import { useEffect, useState, ChangeEvent } from "react";

export function useDateInputFormController(
  value: string | null | undefined,
  onChange?: (value: string | null) => void
) {
  const [text, setText] = useState<string>(value || "");

  // Sync internal state when parent value changes
  useEffect(() => {
    setText(value || "");
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);

    if (onChange) {
      onChange(newValue.trim() === "" ? null : newValue);
    }
  };

  return {
    text,
    handleChange,
  };
}
