import { AuthGuard } from "@shared/components";

export default function AccountPage() { 
  return (
    <AuthGuard>
      <h5>Meus dados</h5>
    </AuthGuard>
  )
}
