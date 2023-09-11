import { AuthGuard } from "@/components";
import { Typography } from "antd";

export default function CompanyPage() {
  return (
    <AuthGuard>
      <Typography>Company</Typography>
    </AuthGuard>
  )
}