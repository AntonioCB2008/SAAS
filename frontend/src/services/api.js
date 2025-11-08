import axios from 'axios'

// Determinar a URL da API baseado no ambiente
const getApiUrl = () => {
  // Se VITE_API_URL estiver definida, usa ela
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Em produção (Render), tenta usar a URL do backend
  // Se você tiver um backend no Render, coloque a URL aqui
  // Exemplo: https://seu-backend.onrender.com
  if (import.meta.env.PROD) {
    // Se não tiver VITE_API_URL definida em produção, retorna vazio para usar relativo
    // ou você pode colocar a URL do seu backend no Render aqui
    return '' // Usa URL relativa (mesmo domínio)
  }
  
  // Em desenvolvimento, usa localhost
  return 'http://localhost:3000'
}

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos de timeout
})

// Log da configuração da API
const apiUrl = api.defaults.baseURL || window.location.origin
console.log('🔗 API Base URL configurada:', apiUrl)

// Aviso se estiver em produção sem VITE_API_URL configurada
if (import.meta.env.PROD && !import.meta.env.VITE_API_URL && api.defaults.baseURL === '') {
  console.warn('⚠️ ATENÇÃO: VITE_API_URL não está configurada em produção!')
  console.warn('⚠️ Configure a variável VITE_API_URL no Render com a URL do seu backend')
  console.warn('⚠️ Exemplo: VITE_API_URL=https://seu-backend.onrender.com')
}

// Interceptor para adicionar token de autenticação (quando implementar)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

