export { auth as middleware } from "@/server/auth/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};