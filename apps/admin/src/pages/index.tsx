import { AuthGuard } from "@/components";
import { CategoryThree } from "@/components/CategoryTree";
import { Card } from "antd";

export default function Home() {
  return (
    <AuthGuard>
      <Card>
        <CategoryThree
          categories={[]}
        />
      </Card>
    </AuthGuard>
  )
}
