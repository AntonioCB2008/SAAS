import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import './Cadastro.css'

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Por favor, preencha todos os campos obrigatórios')
      return false
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return false
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { confirmarSenha, ...dataToSend } = formData
      
      console.log('Enviando dados para cadastro:', { ...dataToSend, senha: '***' })
      console.log('URL da API:', api.defaults.baseURL)
      
      const response = await api.post('/api/usuarios', {
        nome: dataToSend.nome,
        email: dataToSend.email,
        senha: dataToSend.senha,
        telefone: dataToSend.telefone || null
      })

      console.log('Resposta do servidor:', response.data)
      setSuccess('Cadastro realizado com sucesso! Redirecionando...')
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      console.error('Erro ao realizar cadastro:', err)
      console.error('Erro completo:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText,
        request: err.request
      })
      
      // Mensagens de erro mais específicas
      if (err.response) {
        // O servidor respondeu com um status de erro
        const errorMessage = err.response.data?.error || err.response.data?.message
        setError(errorMessage || `Erro ${err.response.status}: ${err.response.statusText}`)
      } else if (err.request) {
        // A requisição foi feita mas não houve resposta
        setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.')
      } else {
        // Algo aconteceu ao configurar a requisição
        setError('Erro ao realizar cadastro. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <span className="logo-icon">🏨</span>
            <h1>Hotel da IA</h1>
          </div>
          <p className="subtitle">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha *</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="link">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro

