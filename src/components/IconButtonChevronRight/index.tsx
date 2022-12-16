import * as C from '@chakra-ui/react';
import Link from 'next/link';
import ChevronRight from '../../images/chevron-right.svg';

interface IconButtonChevronRightProps extends C.IconButtonProps {
  href?: string;
}

const IconButtonChevronRight = ({ href, ...props }: IconButtonChevronRightProps) => (
  <C.IconButton
    as={href ? Link : undefined}
    flexShrink={0}
    href={href}
    icon={<C.Icon as={ChevronRight} boxSize={6} />}
    w={14}
    {...props}
  />
);

export default IconButtonChevronRight;
export type { IconButtonChevronRightProps };
