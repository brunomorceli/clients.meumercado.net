import { AuthGuard, TitleBase } from "@/components";

export default function Home() {
  return (
    <AuthGuard>
      <TitleBase title="Home" />
      <div style={{ height: 50}}></div>
    </AuthGuard>
  )
}
