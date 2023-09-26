'use client';

import { AuthGuard, TitleBase } from "@shared/components";
import { Categories } from "@admins/components";

export default function Home() {
  return (
    <AuthGuard>
      <TitleBase title="Home" />
      <div style={{ height: 50}}></div>
      <Categories />
    </AuthGuard>
  )
}
