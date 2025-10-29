import { useState, useEffect } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import '../login-styles.css'

export default function ResetPassword() {
  const supabase = useSupabaseClient()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    // Check if we have the hash in URL (from email link)
    const hash = searchParams.get('hash')
    if (!hash && !searchParams.get('access_token')) {
      setError('Invalid reset link. Please request a new password reset.')
    }
  }, [searchParams])

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

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
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
              <div className="auth-des">Password reset successful</div>
            </div>
            <div className="auth-success-message">
              <p>Your password has been updated successfully.</p>
              <p>Redirecting to login page...</p>
            </div>
            <div className="auth-actions">
              <Link to="/login" className="auth-button">
                Go to Login
              </Link>
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
            <div className="auth-des">Reset your password</div>
          </div>
          
          <form onSubmit={onSubmit}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
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
                placeholder="Confirm new password"
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
              {loading ? 'Updating password...' : 'Reset password'}
            </button>
          </form>
          
          <div className="auth-actions">
            <Link to="/login" className="auth-button" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

