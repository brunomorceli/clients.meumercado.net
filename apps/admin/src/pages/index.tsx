import { AuthGuard, TitleBase } from "@/components";
import { Categories } from "../components/Companies/Categories";

export default function Home() {
  return (
    <AuthGuard>
      <TitleBase title="Home" />
      <Categories />
      <div style={{ height: 50}}></div>
    </AuthGuard>
  )
}
