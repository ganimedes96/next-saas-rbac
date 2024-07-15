import { Slash } from 'lucide-react'

import { ability } from '@/auth/auth'

import { Separator } from '../ui/separator'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'

export async function Header() {
  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-2 ">
      <div className="flex items-center gap-3">
        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
        {permissions?.can('get', 'Project') && <h1>Projects</h1>}
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-7" />
        <ProfileButton />
      </div>
    </div>
  )
}
