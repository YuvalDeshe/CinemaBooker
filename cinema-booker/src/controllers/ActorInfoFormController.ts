import { useEffect, useId, useState } from "react";

export function useActorInfoFormController(
  initialName: string,
  onChange: (actorName: string) => void,
  onDelete: () => void
) {
  const [actor, setActor] = useState(initialName);
  const uniqueId = useId(); // <-- moved here

  // Notify parent when local state changes
  useEffect(() => {
    onChange(actor);
  }, [actor]);

  const handleInputChange = (newValue: string) => {
    setActor(newValue);
  };

  const handleDelete = () => {
    onDelete();
  };

  return {
    actor,
    uniqueId,
    handleInputChange,
    handleDelete,
  };
}
