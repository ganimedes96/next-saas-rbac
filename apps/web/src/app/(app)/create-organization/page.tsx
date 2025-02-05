import { Header } from '@/components/header'

import { OrganizationForm } from './create-organization-form'

export default function CreateOrganization() {
  return (
    <div className="space-y-4 p-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <OrganizationForm />
      </main>
    </div>
  )
}
