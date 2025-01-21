import type { NextAuthConfig } from 'next-auth';
import { pages } from './auth-pages.ts';
// import { createClient } from '@/utils/supabase/server'

// const supabase= await createClient();
export const authConfig = {
    pages,
    callbacks: {
        authorized({auth, request: {nextUrl} }) {
            const isLoggedIn = !!auth?.user;
            const isOnLogin = nextUrl.pathname.startsWith('/login');
            if (!isOnLogin){
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
    },
    providers: []
} satisfies NextAuthConfig;
