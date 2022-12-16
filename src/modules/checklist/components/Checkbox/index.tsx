import * as C from '@chakra-ui/react';
import { ReactNode } from 'react';
import Check from '../../../../images/check.svg';

interface IconProps extends C.IconProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
}

const Icon = ({ isChecked, isIndeterminate, ...rest }: IconProps) =>
  isChecked || isIndeterminate ? <C.Icon as={Check} {...rest} /> : null;

interface CheckboxProps extends C.CheckboxProps {
  children: ReactNode;
  isChecked: boolean;
}

const Checkbox = ({ children, isChecked, ...rest }: CheckboxProps) => (
  <C.Checkbox icon={<Icon />} isChecked={isChecked} {...rest}>
    {children}
  </C.Checkbox>
);

export default Checkbox;
