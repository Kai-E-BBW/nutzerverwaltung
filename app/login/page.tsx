'use client';
import {useActionState} from 'react';
import {authenticate,login,signup } from '@/app/lib/actions';

export default function LoginPage(){
    return (
        <form>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" required />
            <label htmlFor="password">Passwort:</label>
            <input id="password" name="password" type="password" required />
            <div>
                <button formAction={login}>Log in</button>
                <button formAction={signup}>registrieren</button>
            </div>
        </form>
    );
    // const [errorMessage, formAction, isPending] = useActionState(
    //     authenticate,
    //     undefined,
    // );

    // previous implementation not using supabase-auth
    // return(
    //     <>
    //     <form action={formAction}>
    //         <div className="flex-1">
    //             <h1> Please log in to continue </h1>
    //             <div className="w-full">
    //                 <div>
    //                     <label htmlFor="name">Name</label>
    //                     <div className="relative">
    //                         <input id="name" name="name" 
    //                             placeholder="Gib deinen Namen ein" required 
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="mt-4">
    //                 <label htmlFor="password" >
    //                     Password
    //                 </label>
    //                 <div className="relative">
    //                     <input className="peer" id="password" type="password" name="password"
    //                         placeholder="Passwort" required 
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //         <button className="mt-4 w-full" aria-disabled={isPending}>
    //             Log in
    //         </button>
    //         <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
    //         {errorMessage && (
    //             <>
    //                 <p className="text-sm text-red-500">{errorMessage}</p>
    //             </>
    //         )}
    //         </div>
    //     </form>
    //     </>
    // );
}

