import { FormEvent, SVGProps } from 'react';
import IconWrapper from '../components/page/array/wrapper/IconWrapper';

//signup
export interface FormDataSignUp {
  email: string;
  password: string;
  repeat: string;
}
export interface UseSignUpReturn {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoogleSignIn: () => Promise<void>;
  formData: FormDataSignUp;
  signupErrors: FormDataSignUp;
  isLoading: boolean;
}

//login
export interface FormDataLogin {
  email: string;
  password: string;
  general?: string;
}

export interface UseLoginReturn {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoogleSignIn: () => Promise<void>;
  formData: FormDataLogin;
  loginErrors: FormDataLogin;
  isLoading: boolean;
}

//nav props
export interface NavWrapperProps {
  type: string;
  isSelected: boolean;
  link: string;
}

//input props
export interface CustomsInputProps {
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

//button component
export interface ButtonComponent {
  label: string | JSX.Element;
  onClick?: (e: FormEvent) => void;
  type?: 'button' | 'submit';
  color?: 'empty' | 'full';
  iconSrc?: string;
  disabled?: boolean;
  IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

//icone
export interface IconCustomProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export interface SearchProps {
  searchBar: string;
  handleChange: (value: { [key: string]: string }) => void;
  placeholder: string;
}

export type ToolsBarWrapperProps = {
  label: string;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  color?: 'empty' | 'full' | undefined;
  iconColor?: string;
  onClick: () => void;
};

export interface ArrayContentProps {
  files: FileType[];
}

export interface ArrayHeaderProps {
  name: string;
  label: string;
  icon?: React.FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface FileType {
  checked: boolean;
  filename: string;
  type: string;
  modified: string;
  acces: string;
}

export interface IconWrapperProps {
  type: string;
  className?: string;
}
