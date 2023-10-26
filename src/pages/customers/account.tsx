import { Account } from "@customers/components";
import { AuthGuard } from "@shared/components";

export default function AccountPage() { 
  return (
    <AuthGuard>
      <Account />
    </AuthGuard>
  )
}
