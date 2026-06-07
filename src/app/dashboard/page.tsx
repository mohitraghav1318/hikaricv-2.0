import { auth } from "@/server/auth/auth";
import { redirect } from "next/navigation";

import { logout } from "@/server/actions/auth.actions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <p>{session.user.name}</p>
      <p>{session.user.email}</p>

      <form action={logout}>
        <button
          type="submit"
          className="mt-4 rounded-md border px-4 py-2"
        >
          Logout
        </button>
      </form>
    </main>
  );
}