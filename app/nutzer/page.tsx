import { UserList } from './userList'
import { getUsers,deleteUser,newUser,getRoles,changeRole } from '@/app/lib/actions'
import { Link } from 'next/navigation'
import { DeleteButton, RoleChanger} from './request.tsx'

export default async function Page() {
    const users =await getUsers();
    const roles=await getRoles();
    console.log("got users");
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
                {/*<Link href='./userCreationForm/' >Neuen Nutzer hinzufügen</Link>*/}
            </ul>
        </>
     //<pre>{JSON.stringify(users, null,2)}</pre>
    );
}
