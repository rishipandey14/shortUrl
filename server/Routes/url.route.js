import express from  'express';
import { generateShortUrl, getRedirectUrl } from '../Controllers/url.controller..js';

const urlRouter = express.Router();

urlRouter.post('/', generateShortUrl);
urlRouter.get('/:shortId', getRedirectUrl);

export default urlRouter;