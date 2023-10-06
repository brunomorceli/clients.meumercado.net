import { AuthGuard } from "@shared/components";
import { useRouter } from "next/router";

export default function FavoritesPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AuthGuard>
      <h5>Produtos por categoria {id}</h5>
    </AuthGuard>
  )
}
