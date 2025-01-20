import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import NextAuth from 'next-auth'
import { pages } from './auth-pages.ts'
import {withAuth} from 'next-auth/middleware'
// import {authConfig} from './auth.config'

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export default withAuth({
    pages,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
