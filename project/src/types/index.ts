export interface ImageState {
  url: string | null;
  loading: boolean;
  error: string | null;
}

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}