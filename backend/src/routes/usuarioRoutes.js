import express from 'express';
import {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  fazerLogin
} from '../controllers/usuarioController.js';

const router = express.Router();

// Rota de login (deve vir antes das rotas com parâmetros)
router.post('/login', fazerLogin);

// Rotas CRUD
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.post('/', criarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

export default router;

