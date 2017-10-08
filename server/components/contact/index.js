import Express from 'express';
import controller from './controller.js';

const router = Express.Router();


router.post('/contact', controller.post);


export default router;
