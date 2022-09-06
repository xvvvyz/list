import * as C from '@chakra-ui/react';
import React from 'react';
import ChevronRight from '../../images/chevron-right.svg';
import Link from 'next/link';

interface IconButtonChevronRightProps extends C.IconButtonProps {
  href?: string;
}

const IconButtonChevronRight = ({ href, ...props }: IconButtonChevronRightProps) => {
  const button = (
    <C.IconButton
      as={href ? C.Link : undefined}
      flexShrink={0}
      icon={<C.Icon as={ChevronRight} boxSize={6} />}
      w={14}
      {...props}
    />
  );

  return href ? (
    <Link href={href} passHref>
      {button}
    </Link>
  ) : (
    button
  );
};

export default IconButtonChevronRight;
export type { IconButtonChevronRightProps };
