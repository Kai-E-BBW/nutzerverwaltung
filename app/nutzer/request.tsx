'use client'

import {changeRole,deleteUser,newUser} from '@/app/lib/actions'
import {useState} from 'react';

export function DeleteButton(userid,text){
    return <button onClick={()=>deleteUser(user)}>{text}</button>
}

export function RoleChanger(userid,roles,role){
    const [r,setRole]=useState(role);
    return (
        <select value={r} onChange={(e) => {
            setRole(e.target.value);
            changeRole(userid,e.target.value);
        }}> 
        {roles.map((ro)=>(
            <option value={ro.id}>{ro.name}</option>
        )}
        </select>
    )
}
