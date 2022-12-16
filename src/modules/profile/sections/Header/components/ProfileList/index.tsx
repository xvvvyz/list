import * as C from '@chakra-ui/react';
import isEqual from 'lodash/isEqual';
import { memo } from 'react';
import ButtonChevronExpand from '../../../../../../components/ButtonChevronExpand';
import useEphemeralState from '../../../../../../hooks/use-ephemeral-state';
import useReplicache from '../../../../../../hooks/use-replicache';
import { ProfileWithIdAndText } from '../../../../../../models/profile';
import generateId from '../../../../../../utilities/generate-id';
import AddButton from '../../../../components/AddButton';
import ListItem from '../ProfileListItem';

interface ProfileListProps {
  profiles: ProfileWithIdAndText[];
}

const ProfileList = ({ profiles }: ProfileListProps) => {
  const [autoFocusId, setAutoFocusId] = useEphemeralState('');
  const profilesDisclosure = C.useDisclosure();
  const replicache = useReplicache();

  return (
    <C.Box aria-label="profiles" as="section" pt={5}>
      {!!profiles.length && (
        <ListItem autoFocus={autoFocusId === profiles[0].id} isActive key={profiles[0].id} profile={profiles[0]} />
      )}
      <C.Collapse in={profilesDisclosure.isOpen} transition={profiles.length ? undefined : { enter: { duration: 0 } }}>
        {profiles.slice(1).map((profile) => (
          <ListItem
            autoFocus={autoFocusId === profile.id}
            key={profile.id}
            onOpen={profilesDisclosure.onClose}
            profile={profile}
          />
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
              atBeginning: !profilesDisclosure.isOpen,
              id,
            });
          }}
        >
          add profile
        </AddButton>
        {profiles.length > 1 && (
          <ButtonChevronExpand isToggled={profilesDisclosure.isOpen} onToggle={profilesDisclosure.onToggle} />
        )}
      </C.Flex>
    </C.Box>
  );
};

export default memo(ProfileList, isEqual);
