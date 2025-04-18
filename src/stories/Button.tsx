import React from 'react';
import './button.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  type = 'button',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <div>
      <input name="input1" type="text" defaultValue="bla" />
      <input name="input1" type="text" defaultValue="bla2" />
      <button
        name="button1"
        type={type}
        className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
        style={{ backgroundColor }}
        {...props}
      >
        {label}
      </button>
    </div>
  );
};
