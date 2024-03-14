export interface Common {
  isLoading: boolean;
  error: string | null;
}

export interface ThunkApiConfig {
  rejectValue: string;
}

export interface FormInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}
