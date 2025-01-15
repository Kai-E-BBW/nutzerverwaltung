'use client'
import {useState} from "react"
export function UserList(users: any[]){
    const [list,setUsers]=useState(users);

//dummy functions. will probably be imported from elsewhere
    function removeUser(id){}
    function changeRole(id){}
    return (
        <ul>
            {list.map((entry) => (
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
        </ul>
    );
}
