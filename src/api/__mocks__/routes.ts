import { Router } from 'express';

import { brands } from './data/brands';

const router = Router();

router.get('/brands', (_req, res) => {
    res.status(200).json(brands);
});

router.get('/brands/:slug', (req, res) => {
    const brand = brands.find(({ slug }) => slug === req.params.slug);

    if (!brand) {
        res.status(404).json({ message: 'Brand not found' });

        return;
    }

    res.status(200).json(brand);
});

export { router };
