import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') || '/'

  // Log values for debugging
  console.log('token_hash:', token_hash)
  console.log('type:', type)

  // Ensure token_hash and type are present before proceeding
  if (token_hash && type) {
    const supabase = await createClient()

    // Verify OTP for password reset
    const { error } = await supabase.auth.verifyOtp({
      type: type as 'recovery',
      token_hash,
    })

    if (!error) {
      // Redirect to /auth/reset-pw with original params
      const redirectTo = new URL('/auth/reset-pw', request.url)
      redirectTo.searchParams.set('token_hash', token_hash)
      redirectTo.searchParams.set('type', type)
      redirectTo.searchParams.set('next', next)

      return NextResponse.redirect(redirectTo)
    } else {
      console.error('Error verifying OTP:', error.message)
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }
  } else {
    console.error('Missing token_hash or type')
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  }
}
