import { useEffect, useState } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { useOrg } from '../hooks/use-org'
import { RoleGate } from '../components/RoleGate'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'

type Feedback = { id: string; content: string; created_at: string }

export default function CoachFeedback() {
  const supabase = useSupabaseClient()
  const { orgId } = useOrg()
  const [items, setItems] = useState<Feedback[]>([])
  const [content, setContent] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!orgId) { setItems([]); return }
      const { data } = await supabase
        .from('coach_feedback')
        .select('id,content,created_at')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })
      if (!ignore) setItems((data ?? []) as Feedback[])
    }
    load()
    return () => { ignore = true }
  }, [orgId, supabase])

  async function addFeedback() {
    if (!orgId) return
    await supabase.from('coach_feedback').insert({ org_id: orgId, content })
    setContent('')
    const { data } = await supabase
      .from('coach_feedback')
      .select('id,content,created_at')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
    setItems((data ?? []) as Feedback[])
  }

  return (
    <RoleGate allow={["owner","customer"]}>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share feedback" />
          <Button onClick={addFeedback}>Submit</Button>
        </div>
        <ul className="space-y-2">
          {items.map(f => (
            <li key={f.id} className="border rounded p-3 flex justify-between">
              <span>{f.content}</span>
              <span className="text-xs text-muted-foreground">{new Date(f.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </RoleGate>
  )
}


