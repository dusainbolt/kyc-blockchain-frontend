export interface OptionSelect {
  label: string;
  value: string;
  urlIcon?: any;
  disabled?: boolean;
}

export interface IField {
  name: string;
  label?: string;
  placeholder?: string;
  options?: OptionSelect[];
  component: any;
  type?: 'password' | 'text' | any;
  required?: boolean;
}
