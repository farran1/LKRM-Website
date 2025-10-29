import { useEffect, useState } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { useOrg } from '../hooks/use-org'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

type Thread = { id: string; title: string; created_at: string }

export default function Forum() {
  const supabase = useSupabaseClient()
  const { orgId } = useOrg()
  const [items, setItems] = useState<Thread[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!orgId) { setItems([]); return }
      const { data } = await supabase
        .from('forum_threads')
        .select('id,title,created_at')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })
      if (!ignore) setItems((data ?? []) as Thread[])
    }
    load()
    return () => { ignore = true }
  }, [orgId, supabase])

  async function addThread() {
    if (!orgId) return
    await supabase.from('forum_threads').insert({ org_id: orgId, title })
    setTitle('')
    const { data } = await supabase
      .from('forum_threads')
      .select('id,title,created_at')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
    setItems((data ?? []) as Thread[])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Thread title" />
        <Button onClick={addThread}>Create</Button>
      </div>
      <ul className="space-y-2">
        {items.map(t => (
          <li key={t.id} className="border rounded p-3 flex justify-between">
            <span>{t.title}</span>
            <span className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


