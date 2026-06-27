import express from  'express';
import { generateShortUrl } from '../Controllers/url.js';

const router = express.Router();

router.post('/', generateShortUrl);
// router.get('/:id', redirectUrl);

export default router;