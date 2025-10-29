import { useEffect, useState } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { useOrg } from '../hooks/use-org'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

type Suggestion = { id: string; title: string; created_at: string }

export default function Suggestions() {
  const supabase = useSupabaseClient()
  const { orgId } = useOrg()
  const [items, setItems] = useState<Suggestion[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!orgId) { setItems([]); return }
      const { data } = await supabase
        .from('feature_suggestions')
        .select('id,title,created_at')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })
      if (!ignore) setItems((data ?? []) as Suggestion[])
    }
    load()
    return () => { ignore = true }
  }, [orgId, supabase])

  async function addSuggestion() {
    if (!orgId) return
    await supabase.from('feature_suggestions').insert({ org_id: orgId, title, body })
    setTitle('')
    setBody('')
    const { data } = await supabase
      .from('feature_suggestions')
      .select('id,title,created_at')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
    setItems((data ?? []) as Suggestion[])
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <Textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Details" />
        <Button onClick={addSuggestion}>Submit</Button>
      </div>
      <ul className="space-y-2">
        {items.map(s => (
          <li key={s.id} className="border rounded p-3 flex justify-between">
            <span>{s.title}</span>
            <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


