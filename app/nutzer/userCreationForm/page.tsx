import {createClient} from '@/utils/supabase/server'
import {newUser} from '@/app/lib/actions'
export default async function Page(){
    const supabase= await createClient();
    const {data: roles}= await supabase.from("ROLES").select();
    return(
        <form action={newUser}>
            <label for="name">Benutzername: </label>
            <input type="text" id="name" name="name"><br><br>
            <label for="password">Passwort: </label>
            <input type="password" id="password" name="password">
            <label for="role">Rechte: </label>
            <select name="role" id="role">
                {roles.map((role)=>(
                    <option value={role.id}>{role.name}</option>
               ))}
            </select>
            <input type="submit" value="Submit" id="submit">Nutzer Registrieren</input>
        </form>
    );
}
