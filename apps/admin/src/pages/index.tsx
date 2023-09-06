import { AuthGuard } from "@/components";
import { Card } from "antd";
import { Categories } from "../components/Categories";

export default function Home() {
  return (
    <AuthGuard>
      <Card>
        <Categories />
      </Card>
    </AuthGuard>
  )
}
