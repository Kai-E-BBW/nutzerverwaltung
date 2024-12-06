import { createClient } from '@/utils/supabase/server'

export default async function Page() {
	const supabase = await createClient();
	const {data: users} = await supabase.from("USERS").select();

	return <pre>{JSON.stringify(users, null,2)}</pre>
}
