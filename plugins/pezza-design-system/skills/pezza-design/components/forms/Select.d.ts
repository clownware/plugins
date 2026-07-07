import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  children?: React.ReactNode;
}

export function Select(props: SelectProps): JSX.Element;
