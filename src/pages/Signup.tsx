import { useState } from 'react'
import { useSupabaseClient, useSession } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import '../login-styles.css'

export default function Signup() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  // Redirect if already logged in
  if (session) {
    navigate('/app')
    return null
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-background">
          <img src="/front-view-man-holding-basketball.jpg" alt="Background" loading="lazy" />
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form">
            <div className="auth-logo">
              <Logo width={200} height={85} className="text-white" />
              <div className="auth-des">Check your email</div>
            </div>
            <div className="auth-success-message">
              <p>We've sent you a confirmation email.</p>
              <p>Please check your inbox and click the link to verify your account.</p>
            </div>
            <div className="auth-actions">
              <button
                type="button"
                className="auth-button"
                onClick={() => setSuccess(false)}
              >
                Back to Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
            <div className="auth-des">Create your account</div>
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
                placeholder="Create a password (min. 6 characters)"
                className="auth-input"
                required
                disabled={loading}
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="auth-input"
                required
                disabled={loading}
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="auth-password-toggle"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {error && <div className="auth-error">{error}</div>}
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          
          <div className="auth-divider">
            <span className="auth-divider-text">OR</span>
          </div>
          
          <div className="auth-actions">
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1D75D0', textDecoration: 'underline' }}>
                Sign in
              </Link>
            </p>
            <Link to="/" className="auth-button" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

