import { Router } from 'express';
const route = Router();
import { cadastros, remover, pesquisar, actualizar, pesquisarOne } from '../controllers/userController';
import { userRequired } from '../middlewares';



route.get('/pesquisar', userRequired,pesquisar);
route.get('/pesquisar/o/:id', userRequired, pesquisarOne);
route.get('/pesquisar/o/', userRequired, pesquisarOne);
route.post('/cadastrar', cadastros);
route.delete('/remover/', userRequired, remover);
route.delete('/remover/:id', userRequired, remover);
route.put('/actualizacao/:id', userRequired, actualizar);

export default route;