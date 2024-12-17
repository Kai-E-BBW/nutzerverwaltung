import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {fetchCustomers} from '@/app/lib/data';

export default async function Page(){
  const customers = await fetchCustomers();

  return(
    <main>
      <Breadcrumbs
        breadcrumbs={[
	  {label: 'Invoices', href: '/dashboard/invoices'},
	  {
	    label: 'Create Invoice',
	    href: '/dashboard/invoices/create',
	    active: true,
	  },
	]}
      />
      <Form customers={customers} />
    </main>
  );
}

///action.tsx
'use server';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending','paid']),
  date: z.string(),
});

const CreateInvoice=FormSchema.omit({id:true,date:true});

export async function createInvoice(formData: Formdata) {
  const {customerId, amount, status}=CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount')
    status: formData.get('status'),
  });
  const amountInCents = amount*100;
  const date = new Date().toISOString().split('T')[0];

  //TODO supabase variant
}
//create-form.tsx
import {customerField}from'@/app/lib/definitions';
import Link from 'next/Link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {Button} from '@/app/ui/button';
import {createInvoice} from '@/app/lib/actions';

export default function Form({
  customers,
}: {
  customers: customerField[];
}){
  return (
    <form action={createInvoice)>
