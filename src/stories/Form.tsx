import React from 'react';
import { Button } from './Button';

interface FormProps {
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Primary UI component for user interaction
 */
export const Form = ({
                         primary = false,
                         size = 'medium',
                         backgroundColor,
                         ...props
                       }: FormProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <form>
      <input name="input1" type="text" defaultValue="bla" />
      <input name="input1" type="text" defaultValue="bla2" />
      <Button primary={primary} backgroundColor={backgroundColor} size={size} type="submit" label="Submit" />
    </form>
  );
};
