import { useEffect, useMemo, useState } from 'react'
import { useSession, useSupabaseClient } from '../contexts/AuthContext'

export type Membership = {
  org_id: string
  role: 'owner' | 'customer' | 'partner'
}

export function useMemberships() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!session) {
        setMemberships([])
        setLoading(false)
        return
      }
      setLoading(true)
      const { data, error } = await supabase
        .from('memberships')
        .select('org_id, role')
      if (!ignore) {
        if (error) {
          console.error(error)
          setMemberships([])
        } else {
          setMemberships((data ?? []) as Membership[])
        }
        setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [session, supabase])

  return { memberships, loading }
}

export function useOrg() {
  const { memberships } = useMemberships()
  const [orgId, setOrgId] = useState<string | null>(null)

  useEffect(() => {
    if (memberships.length > 0 && !orgId) {
      setOrgId(memberships[0].org_id)
    }
  }, [memberships, orgId])

  const role = useMemo(() => {
    if (!orgId) return null
    return memberships.find(m => m.org_id === orgId)?.role ?? null
  }, [orgId, memberships])

  return { orgId, setOrgId, role }
}


