import { NextApiHandler } from 'next';
import { createSpace, handleRequest, spaceExists } from 'replicache-nextjs/lib/backend';
import mutations from '../../../mutations';
import isValidSpaceId from '../../../utilities/is-valid-space-id';

const handler: NextApiHandler = async (req, res) => {
  try {
    await handleRequest(req, res, mutations);
  } catch (e) {
    try {
      const spaceId = req.query.spaceID as string;

      if (isValidSpaceId(spaceId) && !(await spaceExists(spaceId))) {
        await createSpace(spaceId);
      }

      await handleRequest(req, res, mutations);
    } catch (e) {
      res.status(418).end();
    }
  }
};

export default handler;
