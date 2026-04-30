import { Router } from 'express';

import { brands } from './data/brands';

const router = Router();

router.get('/brands', (_req, res) => {
  res.status(200).json(brands);
});

export { router };
