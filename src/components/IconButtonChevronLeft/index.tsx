import IconButtonChevronRight, { IconButtonChevronRightProps } from '../IconButtonChevronRight';

const IconButtonChevronLeft = (props: IconButtonChevronRightProps) => (
  <IconButtonChevronRight {...props} transform="rotate(180deg)" />
);

export default IconButtonChevronLeft;
