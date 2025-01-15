'use client';
import {useActionState} from 'react';
import {authenticate } from '@/app/lib/actions';

export default function LoginPage(){
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return(
        <form action={formAction}>
            <div className="flex-1">
                <h1> Please log in to continue </h1>
                <div className="w-full">
                    <div>
                        <label htmlFor="name">Name</label>
                        <div className="relative">
                        <input id="name" name="name" 
                            placeholder="Gib deinen Namen ein" required 
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="password" >
                        Password
                    </label>
                    <div className="relative">
                        <input className="peer" id="password" type="password" name="password"
                            placeholder="Passwort" required minLength={6}
                        />
                    </div>
                </div>
            </div>
            <button className="mt-4 w-full" aria-disabled={isPending}>
                Log in
            </button>
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic=true>
            {errorMessage && (
                <>
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </>
            )}
            </div>
        </form>
    );
}

