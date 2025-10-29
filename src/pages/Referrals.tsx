import { useEffect, useState } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { useOrg } from '../hooks/use-org'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

type Referral = { id: string; status: string; created_at: string }

export default function Referrals() {
  const supabase = useSupabaseClient()
  const { orgId } = useOrg()
  const [items, setItems] = useState<Referral[]>([])
  const [newStatus, setNewStatus] = useState('new')

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!orgId) { setItems([]); return }
      const { data } = await supabase
        .from('referrals')
        .select('id,status,created_at')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })
      if (!ignore) setItems((data ?? []) as Referral[])
    }
    load()
    return () => { ignore = true }
  }, [orgId, supabase])

  async function addReferral() {
    if (!orgId) return
    await supabase.from('referrals').insert({ org_id: orgId, status: newStatus })
    setNewStatus('new')
    const { data } = await supabase
      .from('referrals')
      .select('id,status,created_at')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
    setItems((data ?? []) as Referral[])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={newStatus} onChange={e => setNewStatus(e.target.value)} placeholder="status" />
        <Button onClick={addReferral}>Add</Button>
      </div>
      <ul className="space-y-2">
        {items.map(r => (
          <li key={r.id} className="border rounded p-3 flex justify-between">
            <span>{r.status}</span>
            <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


