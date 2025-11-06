import { supabase } from '../config/supabase.js';

// Listar todos os usuários
export const listarUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar usuários', message: error.message });
  }
};

// Buscar usuário por ID
export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuário', message: error.message });
  }
};

// Criar novo usuário
export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Validações básicas
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('usuario')
      .insert([
        {
          nome,
          email,
          senha, // TODO: hash da senha antes de salvar
          telefone: telefone || null
        }
      ])
      .select()
      .single();

    if (error) {
      // Verificar se é erro de email duplicado
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email já cadastrado' });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário', message: error.message });
  }
};

// Atualizar usuário
export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, telefone } = req.body;

    const updateData = {};
    if (nome !== undefined) updateData.nome = nome;
    if (email !== undefined) updateData.email = email;
    if (senha !== undefined) updateData.senha = senha; // TODO: hash da senha
    if (telefone !== undefined) updateData.telefone = telefone;

    const { data, error } = await supabase
      .from('usuario')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email já cadastrado' });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário', message: error.message });
  }
};

// Deletar usuário
export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('usuario')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar usuário', message: error.message });
  }
};

