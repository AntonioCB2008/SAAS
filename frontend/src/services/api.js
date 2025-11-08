import axios from 'axios'

// Determinar a URL da API baseado no ambiente
// IMPORTANTE: Esta função é executada em runtime, não em build time
const getApiUrl = () => {
  // Prioridade 1: Variável global window.API_URL (pode ser definida no index.html ou por script)
  if (window.API_URL) {
    console.log('✅ Usando window.API_URL:', window.API_URL)
    return window.API_URL
  }
  
  // Prioridade 2: Variável de ambiente VITE_API_URL (definida em build time)
  if (import.meta.env.VITE_API_URL) {
    console.log('✅ Usando VITE_API_URL:', import.meta.env.VITE_API_URL)
    return import.meta.env.VITE_API_URL
  }
  
  // Detecta se está em produção baseado na URL atual (runtime)
  const hostname = window.location.hostname
  const isLocalhost = hostname === 'localhost' || 
                      hostname === '127.0.0.1' ||
                      hostname.includes('localhost')
  
  if (!isLocalhost) {
    // Em produção (não é localhost)
    
    // ═══════════════════════════════════════════════════════════
    // CONFIGURE AQUI A URL DO SEU BACKEND NO RENDER:
    // ═══════════════════════════════════════════════════════════
    // Se o backend está em outro serviço no Render, descomente e configure:
    const BACKEND_URL = '' // Exemplo: 'https://hotel-da-ia-backend.onrender.com'
    // ═══════════════════════════════════════════════════════════
    
    if (BACKEND_URL) {
      console.log('✅ Usando URL do backend configurada:', BACKEND_URL)
      return BACKEND_URL
    }
    
    // Se não configurou a URL, tenta usar URL relativa (mesmo domínio)
    // Isso só funciona se o backend e frontend estão no mesmo serviço Render
    console.warn('⚠️ BACKEND_URL não configurada no código')
    console.warn('⚠️ Tentando usar URL relativa (mesmo domínio)')
    console.warn('⚠️ Para usar backend em outro domínio, configure BACKEND_URL em frontend/src/services/api.js')
    return '' // URL relativa
  }
  
  // Em desenvolvimento local, usa localhost
  console.log('🔧 Modo desenvolvimento: usando localhost:3000')
  return 'http://localhost:3000'
}

const apiUrl = getApiUrl()
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos de timeout
})

// Log da configuração da API
const finalApiUrl = api.defaults.baseURL || window.location.origin
console.log('🔗 API Base URL final:', finalApiUrl)
console.log('🌐 Hostname atual:', window.location.hostname)
console.log('🔧 Modo:', window.location.hostname === 'localhost' ? 'Desenvolvimento' : 'Produção')

// Aviso se estiver tentando usar localhost em produção
if (window.location.hostname !== 'localhost' && api.defaults.baseURL === 'http://localhost:3000') {
  console.error('❌ ERRO: Tentando usar localhost:3000 em produção!')
  console.error('❌ Configure VITE_API_URL no Render e faça um novo build')
  console.error('❌ Ou configure a URL do backend no código (frontend/src/services/api.js)')
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

