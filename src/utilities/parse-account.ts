import parseProfile from './parse-profile';

const parseAccount = (data) => ({
  id: data.user.id,
  profiles: data.user.profiles.map((profileId) =>
    parseProfile(profileId, data)
  ),
});

export default parseAccount;
