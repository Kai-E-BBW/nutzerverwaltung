'use server'
//import { z } from 'zod';
import {createClient} from '@/utils/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import { SignIn } from '@/auth';
import { AuthError} from 'next-auth';

const supabase=await createClient()

//const UserSchema = z.object({
//    id: z.string(),
//    name: z.string(),
//    password: z.string(),
//    role: z.number(),
//});

//const NewUser=UserSchema.omit({id:true});

export async function authenticate(prevState, formData){
    try{
        await signIn('credentials',formData);
    }catch (error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignIn':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}

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
//    if (error) throw error;
    revalidatePath('/nutzer');
    redirect('/nutzer');
}

export async function deleteUser(id){
    const { error } =await supabase
        .from('USERS')
        .delete().eq('id',id)
    ;
//    if (error) throw error;
    revalidatePath('/nutzer');
    redirect('/nutzer');
}

export async function getUsers(){
    const{data}=await supabase
        .from('USERS')
        .select()
    ;
//    if (error) throw error;
    return data
}

export async function getRoles(){
    const {data}=await supabase
        .from('ROLES')
        .select()
    ;
    return data;
}

export async function changeRole(n,r){
    const {error} = await supabase.from('USERS')
    .update({role:r}).eq('id',n);
    revalidatePath('/nutzer');
    redirect('/nutzer');
}
