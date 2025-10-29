import { useEffect, useState } from 'react'
import { useSupabaseClient } from '../contexts/AuthContext'
import { useOrg, useMemberships } from '../hooks/use-org'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Org = { id: string; name: string }

export function OrganizationSwitcher() {
  const supabase = useSupabaseClient()
  const { memberships } = useMemberships()
  const { orgId, setOrgId } = useOrg()
  const [orgs, setOrgs] = useState<Org[]>([])

  useEffect(() => {
    let ignore = false
    async function load() {
      if (memberships.length === 0) { setOrgs([]); return }
      const ids = memberships.map(m => m.org_id)
      const { data } = await supabase.from('organizations').select('id,name').in('id', ids)
      if (!ignore) setOrgs((data ?? []) as Org[])
    }
    load()
    return () => { ignore = true }
  }, [memberships, supabase])

  if (orgs.length <= 1) return null

  return (
    <div className="w-56">
      <Select value={orgId ?? undefined} onValueChange={(v) => setOrgId(v)}>
        <SelectTrigger>
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {orgs.map(o => (
            <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}


