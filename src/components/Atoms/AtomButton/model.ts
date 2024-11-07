export type ButtonType = 'button' | 'submit' | 'reset';

export interface IProps {
  label: string;
  disabled?: boolean;
  bold?: boolean;
  pill?: boolean;
  full?: boolean;
  rounded?: boolean;
  outline?: boolean;
  isLoading?: boolean;
  type?: ButtonType;
  variant?: string;
  size?: string;
}
