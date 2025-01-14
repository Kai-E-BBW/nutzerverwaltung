'use client'

import {changeRole,deleteUser,newUser} from '@/app/lib/actions'
import {useState} from 'react';

export function DeleteButton(props){
    const{userid,text}=props;
    return( 
        <>
        <button onClick={()=>deleteUser(userid)}>{text}</button>
        </>
    );
}

export function RoleChanger(props){
    const {userid,roles,role}=props;
    const [r,setRole]=useState(role);
    return (
        <select value={r} onChange={(e) => {
            setRole(e.target.value);
            changeRole(userid,e.target.value);
        }}> 
        {roles.map((ro)=>(
            <option key={ro.name} value={ro.id}>{ro.name}</option>
        ))}
        </select>
    );
}
