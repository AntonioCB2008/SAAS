import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // TODO: Implementar autenticação quando o backend estiver pronto
    // Por enquanto, apenas validação básica
    if (!formData.email || !formData.senha) {
      setError('Por favor, preencha todos os campos')
      setLoading(false)
      return
    }

    try {
      // Simulação de login (remover quando implementar autenticação)
      console.log('Login:', formData)
      setError('Funcionalidade de login será implementada em breve')
      
      // Quando implementar:
      // const response = await axios.post('/api/auth/login', formData)
      // localStorage.setItem('token', response.data.token)
      // navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login')
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
          <p className="subtitle">Bem-vindo de volta!</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <Link to="/recuperar-senha" className="forgot-password">
              Esqueceu a senha?
            </Link>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

