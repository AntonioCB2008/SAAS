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

    console.log('Recebendo requisição de cadastro:', { nome, email, telefone, senha: senha ? '***' : 'não fornecida' });

    // Validações básicas
    if (!nome || !email || !senha) {
      console.log('Validação falhou: campos obrigatórios faltando', { nome: !!nome, email: !!email, senha: !!senha });
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validação falhou: email inválido', email);
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Validação de senha
    if (senha.length < 6) {
      console.log('Validação falhou: senha muito curta');
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    console.log('Tentando inserir usuário no Supabase...');
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
      console.error('Erro do Supabase:', error);
      // Verificar se é erro de email duplicado
      if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('unique')) {
        return res.status(409).json({ error: 'Email já cadastrado' });
      }
      return res.status(400).json({ 
        error: 'Erro ao criar usuário', 
        message: error.message,
        code: error.code 
      });
    }

    console.log('Usuário criado com sucesso:', { id: data?.id, email: data?.email });
    return res.status(201).json(data);
  } catch (error) {
    console.error('Erro inesperado ao criar usuário:', error);
    return res.status(500).json({ 
      error: 'Erro ao criar usuário', 
      message: error.message 
    });
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

// Login de usuário
export const fazerLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validações básicas
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário por email
    const { data, error } = await supabase
      .from('usuario')
      .select('id, nome, email, telefone')
      .eq('email', email)
      .eq('senha', senha)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    // Login bem-sucedido
    return res.status(200).json({
      message: 'Login realizado com sucesso',
      usuario: data
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login', message: error.message });
  }
};

