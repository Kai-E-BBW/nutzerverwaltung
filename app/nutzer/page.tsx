import { createClient } from '@/utils/supabase/server'
import { UserList } from './userList'
import { newUser } from '@/app/lib/actions'

//TODO: idk, fuggn... enable database changes
export default async function Page() {
    const supabase = await createClient();
    const {data: users} = await supabase.from("USERS").select();

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
                    <button onPressed='removeUser(entry.id)'>
                        delete {entry.name}
                    </button>
                    <dropDown onPressed="changeRole(entry.id)">
                        role: {entry.role}
                    </dropDown>
                </li>
            ))}
            <button onPressed="addUser()">+</button>
        </ul>        </>
     //<pre>{JSON.stringify(users, null,2)}</pre>
    );
}
