import { entitySchema, generate } from '@rocicorp/rails';
import { z } from 'zod';

type Profile = z.infer<typeof profileSchema>;
type ProfileWithIdAndText = Pick<Profile, 'id' | 'text'>;

const profileSchema = entitySchema.extend({
  categoryIds: z.string().array(),
  checklistIds: z.string().array(),
  id: z.string(),
  text: z.string(),
});

const profile = generate('profile', profileSchema);

export default profile;
export type { Profile, ProfileWithIdAndText };
