import { UserList } from './userList'
import { getUsers,deleteUser,newUser,getRoles,changeRole } from '@/app/lib/actions'
import Link from 'next/link'
import { DeleteButton, RoleChanger} from './request.tsx'
import { signOut } from '@/auth'

export default async function Page() {
    const users =await getUsers();
    const roles=await getRoles();
    return (
        <>
            <ul>
                {users.map((entry) => (
                    <li key={entry.id}>
                        {entry.name}
                        <RoleChanger 
                            userid={entry.id}
                            roles={roles}
                            role= {entry.role} 
                            />
                        <DeleteButton userid={entry.id} text={"delete "+entry.name} />
                    </li>
                ))}
            </ul>
            <Link href='/userCreationForm' >Neuen Nutzer hinzufügen</Link>
            <form 
                action={async ()=> {
                    'use server'
                    await signOut();
                }}
            >
                <button className="bg-gray-50 p-3">Sign Out</button>
            </form>
        </>
     //<pre>{JSON.stringify(users, null,2)}</pre>
    );
}
