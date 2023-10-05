import { AuthGuard } from "@shared/components";

export default function FavoritesPage() { 
  return (
    <AuthGuard>
      <h5>Favoritos</h5>
    </AuthGuard>
  )
}
