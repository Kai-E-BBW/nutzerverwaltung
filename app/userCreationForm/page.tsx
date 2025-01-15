import {newUser,getRoles} from '@/app/lib/actions'
import Link from 'next/link'
export default async function Page(){
    const roles=await getRoles();
    return(
        <>
        <form action={newUser}>
            <label for="name">Benutzername: </label>
            <input type="text" id="name" name="name"></input><br></br>
            <label for="password">Passwort: </label>
            <input type="password" id="password" name="password"></input>
            <label for="role">Rechte: </label>
            <select name="role" id="role">
                {roles.map((role)=>(
                    <option key={role.name} value={role.id}>{role.name}</option>
                ))}
            </select>
            <input type="submit" value="Submit" id="submit" text="Nutzer Registrieren"></input>
        </form>
            <Link href='/'>Abbrechen</Link>
        </>
    );
}
