import {Request, Response, Router} from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	console.log('stop');
	res.end();
});

export const route = router;
