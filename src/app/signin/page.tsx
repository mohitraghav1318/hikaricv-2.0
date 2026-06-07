import { signIn } from "@/server/auth/auth";

export default function SignInPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <form
                action={async () => {
                    "use server";

                    await signIn("google", {
                        redirectTo: "/dashboard",
                    });
                }}
            >
                <button
                    type="submit"
                    className="rounded-md border px-4 py-2"
                >
                    Sign in with Google
                </button>
            </form>
        </main>
    );
}