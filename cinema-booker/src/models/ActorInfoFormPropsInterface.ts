export interface ActorInfoProps {
  name: string;
  disableDelete: boolean;
  onDelete: () => void;
  onChange: (actorName: string) => void;
};