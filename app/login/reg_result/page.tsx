import {createClient} from '@/utils/supabase/server'

export default async function Page(){
    const supabase=await createClient();
    const {data:{user}}=await supabase.auth.getUser();
    return (
        <>
            <p>registrierung von</p>
            <p>{user}</p>
            <p>war erfolgreich</p>
        </>
    );
}
