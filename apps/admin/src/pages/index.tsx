import { AuthGuard, Products } from "@/components";
import { Categories } from "../components/Categories";

export default function Home() {
  return (
    <AuthGuard>
      <Categories />
      <div style={{ height: 50}}></div>
      <Products />
    </AuthGuard>
  )
}
