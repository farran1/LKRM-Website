import { useState } from 'react'
import { useSupabaseClient, useSession } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import '../login-styles.css'

export default function Login() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already logged in
  if (session) {
    navigate('/app')
    return null
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Session will be updated via AuthContext, redirect handled above
      navigate('/app')
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError('Please enter your email address first')
      return
    }
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setError(error.message)
    } else {
      setError(null)
      alert('Password reset email sent! Check your inbox.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img src="/front-view-man-holding-basketball.jpg" alt="Background" loading="lazy" />
      </div>
      <div className="auth-form-wrapper">
        <div className="auth-form">
          <div className="auth-logo">
            <Logo width={200} height={85} className="text-white" />
            <div className="auth-des">Login into your account</div>
          </div>
          
          <form onSubmit={onSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="auth-input"
              required
              disabled={loading}
              autoComplete="email"
            />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="auth-input"
                required
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleForgotPassword()
              }}
              className="auth-forgot-password"
            >
              Forgot password?
            </a>
            
            {error && <div className="auth-error">{error}</div>}
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span className="auth-divider-text">OR</span>
          </div>
          
          <div className="auth-actions" style={{ display: 'grid', gap: 12 }}>
            <Link to="/signup" className="auth-button">
              Create account
            </Link>
            <Link to="/" className="auth-button" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


