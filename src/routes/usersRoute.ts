import { Router } from 'express';
const route = Router();
import { cadastros, remover, pesquisar, actualizar, cadastrosPage, pesquisarOne } from '../controllers/userController';



route.get('/pesquisar', pesquisar);
route.get('/pesquisar/o/:id', pesquisarOne);
route.get('/pesquisar/o/', pesquisarOne);
route.get('/cadastrar', cadastrosPage);
route.post('/cadastrar', cadastros);
route.delete('/remover/', remover);
route.delete('/remover/:id', remover);
route.put('/actualizacao/:id', actualizar);

export default route;