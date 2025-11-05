import React from 'react'
import { useOrg } from '../hooks/use-org'

type Role = 'owner' | 'customer' | 'partner'

export function RoleGate({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  const { role } = useOrg()
  if (!role) return null
  if (!allow.includes(role)) return null
  return <>{children}</>
}



