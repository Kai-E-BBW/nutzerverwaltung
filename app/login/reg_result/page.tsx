import {createClient} from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Page(){
    const supabase=await createClient();
    const {data:{user}}=await supabase.auth.getUser();
    return (
        <>
            <p>registrierung von</p>
            <p>{user.email}</p>
            <p>war erfolgreich</p>
            <Link href="/">zur Hauptseite</Link>
        </>
    );
}
