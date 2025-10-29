import { useEffect, useState } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { useOrg } from '../hooks/use-org'
import { RoleGate } from '../components/RoleGate'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

type Ticket = { id: string; subject: string; status: string; created_at: string }

export default function Tickets() {
  const supabase = useSupabaseClient()
  const { orgId } = useOrg()
  const [items, setItems] = useState<Ticket[]>([])
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!orgId) { setItems([]); return }
      const { data } = await supabase
        .from('tickets')
        .select('id,subject,status,created_at')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })
      if (!ignore) setItems((data ?? []) as Ticket[])
    }
    load()
    return () => { ignore = true }
  }, [orgId, supabase])

  async function addTicket() {
    if (!orgId) return
    await supabase.from('tickets').insert({ org_id: orgId, subject, body })
    setSubject('')
    setBody('')
    const { data } = await supabase
      .from('tickets')
      .select('id,subject,status,created_at')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
    setItems((data ?? []) as Ticket[])
  }

  return (
    <RoleGate allow={["owner","customer"]}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
          <Input value={body} onChange={e => setBody(e.target.value)} placeholder="Body" />
          <Button onClick={addTicket}>Submit</Button>
        </div>
        <ul className="space-y-2">
          {items.map(t => (
            <li key={t.id} className="border rounded p-3 flex justify-between">
              <span>{t.subject} — {t.status}</span>
              <span className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </RoleGate>
  )
}


