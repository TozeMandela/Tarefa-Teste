import { Router } from 'express';
import { register, ShowOne, login } from '../controllers/loginController';
import { userRequired } from '../middlewares';
const route = Router();


route.post('/register', register);
route.get('/data/:id', userRequired, ShowOne);
route.post('/', login);

export default route;