import * as C from '@chakra-ui/react';
import React from 'react';
import AddButton from '../../../../components/AddButton';
import IconButtonChevronExpand from '../../../../components/IconButtonChevronExpand';
import IconButtonChevronRight from '../../../../components/IconButtonChevronRight';
import ListItem from '../ListItem';
import generateId from '../../../../../../utilities/generate-id';
import useAllProfile from '../../../../../../hooks/use-all-profile';
import useEphemeralState from '../../../../../../hooks/use-ephemeral-state';
import useReplicache from '../../../../../../hooks/use-replicache';

const Profiles = () => {
  const [autoFocusId, setAutoFocusId] = useEphemeralState('');
  const profiles = useAllProfile();
  const { isOpen, onClose, onToggle } = C.useDisclosure();
  const { replicache } = useReplicache();

  return (
    <C.Box aria-label="profiles" as="section" pt={5}>
      {!!profiles.length && (
        <ListItem autoFocus={autoFocusId === profiles[0].id} key={profiles[0].id} profile={profiles[0]} />
      )}
      <C.Collapse in={isOpen} transition={profiles.length ? undefined : { enter: { duration: 0 } }}>
        {profiles.slice(1).map((profile) => (
          <C.Flex key={profile.id}>
            <ListItem autoFocus={autoFocusId === profile.id} profile={profile} />
            <IconButtonChevronRight
              aria-label="open profile"
              h={16}
              onClick={async () => {
                if (!replicache) return;
                onClose();

                await replicache.mutate.reorderProfile({
                  accountId: replicache.name,
                  id: profile.id,
                  toIndex: 0,
                });
              }}
            />
          </C.Flex>
        ))}
      </C.Collapse>
      <C.Flex>
        <AddButton
          onClick={async () => {
            if (!replicache) return;
            const id = generateId();
            setAutoFocusId(id);

            await replicache.mutate.createProfile({
              accountId: replicache.name,
              atBeginning: !isOpen,
              id,
            });
          }}
        >
          add profile
        </AddButton>
        {profiles.length > 1 && <IconButtonChevronExpand isToggled={isOpen} onToggle={onToggle} />}
      </C.Flex>
    </C.Box>
  );
};

export default Profiles;
