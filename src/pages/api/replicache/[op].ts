import { NextApiHandler } from 'next';
import { handleRequest } from 'replicache-nextjs/lib/backend';
import mutations from '../../../mutations';

const handler: NextApiHandler = (req, res) => handleRequest(req, res, mutations);

export default handler;
