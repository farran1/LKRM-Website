import { Outlet, Link, useNavigate } from 'react-router-dom'
import { OrganizationSwitcher } from './OrganizationSwitcher'
import { useSupabaseClient, useUser } from '../contexts/AuthContext'
import { Button } from './ui/button'

export function AppLayout() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const navigate = useNavigate()

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold">LKRM</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/app/referrals">Referrals</Link>
            <Link to="/app/tickets">Tickets</Link>
            <Link to="/app/suggestions">Suggestions</Link>
            <Link to="/app/forum">Forum</Link>
            <Link to="/app/feedback">Coach Feedback</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <OrganizationSwitcher />
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}


