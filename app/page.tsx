"use client"

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="w-screen h-screen">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
