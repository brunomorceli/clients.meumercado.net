import { AddCategory, AuthGuard } from "@/components";
import { Button } from "antd";

export default function Home() {
  return (
    <AuthGuard>
      <h3>hello world</h3>
      <Button>Hello world</Button>
    </AuthGuard>
  )
}
