'use server'
//import { z } from 'zod';
import {createClient} from '@/utils/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

const supabase=await createClient()

//const UserSchema = z.object({
//    id: z.string(),
//    name: z.string(),
//    password: z.string(),
//    role: z.number(),
//});

//const NewUser=UserSchema.omit({id:true});

export async function newUser(userData: FormData){
//    const {name, password, role}=NewUser.parse({
//        name: userData.get('name'),
//        role: userData.get('role'),
//        password: userData.get('password'),
//    });
    const name=userData.get('name');
    const role=userData.get('role');
    const password=userData.get('password');

    const { error } =await supabase
        .from('USERS')
        .insert({name: name, password: password, role: role });
    revalidatePath('/nutzer');
    redirect('/nutzer');
}

export async function deleteUser(id){
    console.log("Who called?");
    const { error } =await supabase
        .from('NOTES')
        .delete().eq('id',id)
    ;
    revalidatePath('/nutzer');
    redirect('/nutzer');
}

export async function getUsers(){
    const{data}=await supabase
        .from('USERS')
        .select()
    ;
    console.log(data);
    return data
}
