'use server'
//import { z } from 'zod';
import {createClient} from '@/utils/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError} from 'next-auth';

const supabase=await createClient();

//const UserSchema = z.object({
//    id: z.string(),
//    name: z.string(),
//    password: z.string(),
//    role: z.number(),
//});

//const NewUser=UserSchema.omit({id:true});

/*catch (error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignIn':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }*/

export async function authenticate(prevState, formData: FormData){
    // try{
        await signIn('credentials',formData);
    // }
}

export async function newUser(userData: FormData){
//    const {name, password, role}=NewUser.parse({
//        name: userData.get('name'),
//        role: userData.get('role'),
//        password: userData.get('password'),
//    });
    const name: string=userData.get('name');
    const role: number=userData.get('role');
    const password: string=userData.get('password');

    const { error } =await supabase
        .from('USERS')
        .insert({name: name, password: password, role: role });
//    if (error) throw error;
    revalidatePath('/nutzer');
    redirect('/nutzer');
}

export async function deleteUser(id: string){
    const { error } =await supabase
        .from('USERS')
        .delete().eq('id',id)
    ;
//    if (error) throw error;
    revalidatePath('/nutzer');
    redirect('/nutzer');
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
    revalidatePath('/nutzer');
    redirect('/nutzer');
}



export async function login(formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        password: formData.get('password') as string,
    };

    const { error }=await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('error');
    }
    revalidatePath('/users','layout');
    redirect('/users');
}

export async function signup(formData: FormData) {
    const data={
        name: formData.get('name') as string,
        password: formData.get('password') as string,
    }

    const {error}=await supabase.auth.signUp(data);
    if (error) {
        redirect('/error');
    }

    revalidatePath('/users','layout');
    redirect('/users');
}

export async function signOut(){
    const { data: {user}}=await supabase.auth.getUser();
    console.log(user);
    const {error} = await supabase.auth.signOut();
    if (error) {
        redirect('/error');
    }
}
