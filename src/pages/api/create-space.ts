import { NextApiHandler } from 'next';
import generateId from '../../utilities/generate-id';
import transact from '../../database/transact';
import { createSpace } from '../../database/queries';

const handler: NextApiHandler = async (req, res) => {
  const spaceId = generateId();
  await transact((e) => createSpace(e, spaceId));
  res.status(200).json({ spaceId });
};

export default handler;
