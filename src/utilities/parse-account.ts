import parseProfile from './parse-profile';

const parseAccount = (data) => ({
  id: data.userMap.id,
  profiles: data.userMap.profiles.map((profileId) =>
    parseProfile(profileId, data)
  ),
});

export default parseAccount;
