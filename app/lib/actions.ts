'use server'
//import { z } from 'zod';
import {createClient} from '@/utils/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError} from 'next-auth';

const supabase=await createClient();

export async function authenticate(prevState, formData: FormData){
    // try{
        await signIn('credentials',formData);
    // }
}

export async function newUser(userData: FormData){
    const name: string=userData.get('name');
    const role: number=userData.get('role');
    const password: string=userData.get('password');
    const { error } =await supabase
        .from('USERS')
        .insert({name: name, password: password, role: role });
//    if (error) throw error;
    revalidatePath('/');
    redirect('/');
}

export async function whoLoggedIn(){
    const {data:{user}}=await supabase.auth.getUser();
    return user;
}

export async function deleteUser(id: string){
    const { error } =await supabase
        .from('USERS')
        .delete().eq('id',id)
    ;
//    if (error) throw error;
    revalidatePath('/');
    redirect('/');
}
//§§
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

export async function changeRole(id: string,r: number){
    const {error} = await supabase.from('USERS')
    .update({role:r}).eq('id',id);
    revalidatePath('/');
    redirect('/');
}

    // check if name is an email address. make a fake, but valid adress if it isn't
function fakeMail(name: string){
    if (name.indexOf('@')==-1){
       name+="@noemail.net"; 
    }
    return name
}

export async function login(formData: FormData) {
    let data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };
    data.email=fakeMail(data.email);
    const { error }=await supabase.auth.signInWithPassword(data);
    if (error) {
        console.log(error);
        // redirect('/error');
    }
    revalidatePath('/','layout');
    redirect('/');
}

export async function signup(formData: FormData) {
    let data={
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    console.log(data);
    console.log(data.email);
    data.email=fakeMail(data.email);
    console.log(data);
    const {error}=await supabase.auth.signUp(data);
    if (error) {
        console.log(error);
        // redirect('/error');
    }
    revalidatePath('/login/reg_result','layout');
    redirect('/login/reg_result');
}

export async function signOut(){
    const { data: {user}}=await supabase.auth.getUser();
    console.log(user);
    const {error} = await supabase.auth.signOut();
    if (error) {
        // redirect('/error');
    }
}
