import {createClient} from '@/utils/supabase/server'
export default async function Page(){
    const supabase= await createClient();
    const {data: roles}= await supabase.from("ROLES").select();
    return(
        <form>
        <label for="name">Benutzername: </label>
        <input type="text" id="name" name="name"><br><br>
        <select name="role" id="role">
            {roles.map((role)=>(
                <option value={role.id}>{role.name}</option>
           ))}
        </select>
        </form>
    );
}
