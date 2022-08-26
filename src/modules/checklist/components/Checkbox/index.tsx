import * as C from '@chakra-ui/react';
import React from 'react';
import Check from '../../../../images/check.svg';

interface IconProps extends C.IconProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
}

const Icon = ({ isChecked, isIndeterminate, ...rest }: IconProps) =>
  isChecked || isIndeterminate ? <C.Icon as={Check} {...rest} /> : null;

interface CheckboxProps extends C.CheckboxProps {
  isChecked: boolean;
  text: string;
}

const Checkbox = ({ isChecked, text, ...rest }: CheckboxProps) => (
  <C.Checkbox icon={<Icon />} isChecked={isChecked} {...rest}>
    {text}
  </C.Checkbox>
);

export default Checkbox;
