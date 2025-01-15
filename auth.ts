import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z } from 'zod';
import {createClient} from '@/utils/supabase/server';
import bcrypt from 'bcrypt';

const supabase= await createClient();

async function getUser(name){
    try {
        const user = await supabase.from('USERS')
            .select()
            .eq('name',name)
        ;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const {auth, signIn, signOut }= NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({name: z.string(), password: z.string().min(6) })
                .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { name, password} = parsedCredentials.data;
                    const user = await getUser(name);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
