import { Router } from 'express';
import { register, ShowOne, login, gettoken } from '../controllers/loginController';
import { userRequired } from '../middlewares';
const route = Router();


route.post('/register', register);
route.get('/data/:id', userRequired, ShowOne);
route.post('/', login);
route.get('/get-user', userRequired, gettoken);

export default route;