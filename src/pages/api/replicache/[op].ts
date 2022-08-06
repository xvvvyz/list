import { NextApiHandler } from 'next';
import { createSpace, handleRequest } from 'replicache-nextjs/lib/backend';
import isValidSpaceId from '../../../utilities/is-valid-space-id';
import mutations from '../../../mutations';

const handler: NextApiHandler = async (req, res) => {
  try {
    await handleRequest(req, res, mutations);
  } catch (e) {
    try {
      const spaceId = req.query.spaceID;
      if (isValidSpaceId(spaceId)) await createSpace(spaceId as string);
      await handleRequest(req, res, mutations);
    } catch (e) {
      res.status(418).end();
    }
  }
};

export default handler;
