import { AuthGuard } from "@/components";
import { CategoryThree } from "@/components/CategoryTree";
import { Button } from "antd";

export default function Home() {
  return (
    <AuthGuard>
      <h3>hello world</h3>
      <Button>Hello world</Button>
      <div>
        <CategoryThree
          categories={[]}
        />
      </div>
    </AuthGuard>
  )
}
