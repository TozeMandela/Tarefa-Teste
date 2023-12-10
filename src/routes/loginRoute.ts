import { Router } from 'express';
import { register, ShowOne } from '../controllers/loginController';
const route = Router();


route.post('/register', register);
route.get('/data/:id', ShowOne);
// route.get('/cadastrar', cadastrosPage);
// route.post('/cadastrar', cadastros);
// route.delete('/remover/', remover);
// route.delete('/remover/:id', remover);
// route.put('/actualizacao/:id', actualizar);

export default route;