'use client';

import { AuthGuard, TitleBase } from "@shared/components";

export default function Home() {
  return (
    <AuthGuard>
      <TitleBase title="Home - Admins" />
    </AuthGuard>
  )
}
