'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/server'

export async function login(formData: FormData) {

  console.log('✅ login server action triggered');
  // Log the headers to debug the issue
  console.log('Request Headers:', formData);

  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options:{
        data: {
            full_name: formData.get('fullname'), 
          },

    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signout(){
  const supabase = await createClient()
  
  // defaults to the global scope
await supabase.auth.signOut()

revalidatePath('/','layout')
redirect('/') // or homepage if you prefer

}


export async function resetpwpage(formData: FormData ){
  const email = formData.get('email') as string;
  const supabase = await createClient();
  
  const {error} = await supabase.auth.resetPasswordForEmail(email,{
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-pw`,
  });

  if(error){
    throw new Error(error.message);
  }
}

export async function updatepassword(formData: FormData){
  const supabase = await createClient();
  const { error }= await supabase.auth.updateUser({ password: 'new_password' })

  if (error) {
    throw new Error(error.message); // or handle error gracefully
  }

  // redirect to login or dashboard after success
  redirect('/dashboard');
}