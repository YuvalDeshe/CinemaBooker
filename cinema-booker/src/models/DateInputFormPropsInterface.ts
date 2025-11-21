export interface DateInputFormProps {
  value?: string;
  onChange?: (dateString: string | null) => void;
  id?: string;
  name?: string;
  label?: string;
}