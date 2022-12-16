import * as C from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InformationComponentProps {
  children: ReactNode;
}

const Tip = ({ children }: InformationComponentProps) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ delay: 1, duration: 0.4 }}
  >
    <C.Container aria-label="information" as="section" maxW="container.sm" mt={12}>
      <C.VStack spacing={12}>
        <C.Divider borderColor="borderSecondary" h={12} orientation="vertical" />
        <C.VStack spacing={6} textAlign="center">
          <C.Text>{children}</C.Text>
        </C.VStack>
      </C.VStack>
    </C.Container>
  </motion.div>
);

export default Tip;
