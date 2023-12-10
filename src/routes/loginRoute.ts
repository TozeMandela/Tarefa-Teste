import { Router } from 'express';
import { register, ShowOne, login } from '../controllers/loginController';
const route = Router();


route.post('/register', register);
route.get('/data/:id', ShowOne);
//route.get('/cadastrar', cadastrosPage);
route.post('/', login);
// route.delete('/remover/', remover);
// route.delete('/remover/:id', remover);
// route.put('/actualizacao/:id', actualizar);

export default route;