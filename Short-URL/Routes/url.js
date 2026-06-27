import express from  'express';
import { generateShortUrl, getRedirectUrl } from '../Controllers/url.controller..js';

const router = express.Router();

router.post('/', generateShortUrl);
router.get('/:shortId', getRedirectUrl);

export default router;