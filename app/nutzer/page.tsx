import { createClient } from '@/utils/supabase/server'
import { UserList } from './userList'
import { getUsers,deleteUser,newUser } from '@/app/lib/actions'

//TODO: idk, fuggn... enable database changes
export default async function Page() {
    const users =await getUsers();
    console.log("got users");
    console.log(users);

    //remove the associated user entry
    //(no confirmation (yet(?)))
    async function removeUser(n){
        alert("user would be deleted");
        //const {error} = await supabase.from('USERS')
        //.delete().eq('id',n);
    }

    async function changeRole(n,r){
        const {error} = await supabase.from('USERS')
        .update({role:r}).eq('id',n);
    }
    return (
        <>
          {/*  <UserList users={users} />*/}

        <ul>
            {users.map((entry) => (
                <li key={entry.id}>
                    {entry.name}
                    <button onPressed={deleteUser(entry.id)}>
                        delete {entry.name}
                    </button>
                    <dropDown onPressed="changeRole(entry.id)">
                        role: {entry.role}
                    </dropDown>
                </li>
            ))}
            <button onPressed="addUser()">Neuen Nutzer hinzufügen</button>
        </ul>        </>
     //<pre>{JSON.stringify(users, null,2)}</pre>
    );
}
