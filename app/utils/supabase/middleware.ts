import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  /* console.log("🛡️ Middleware running!");
  console.log("🌐 Origin:", request.headers.get("origin"));
  console.log("📡 X-Forwarded-Host:", request.headers.get("x-forwarded-host"));
  console.log("🧭 Path:", request.nextUrl.pathname);
  console.log("🔗 Full URL:", request.url); */

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    /*
    !user &&
    // !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
    */

    //for logged out users
    !user &&
    !request.nextUrl.pathname.includes("/auth/reset-pw") && // Avoid redirect if already on /auth page
    // !request.nextUrl.pathname.startsWith('/')   &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/") &&
    !request.nextUrl.pathname.startsWith("/auth?") // Allow any query params related to /auth
  ) {
    // no user, potentially respond by redirecting the user to the login page

    /* console.log("Pathname:", request.nextUrl.pathname);
    console.log("Query Params:", request.nextUrl.searchParams.toString());
    console.log("User:", user);

    console.log("Request URL:", request.url);
    console.log("Next URL Href:", request.nextUrl.href);

    console.log("Origin Header:", request.headers.get("origin"));
    console.log("X-Forwarded-Host:", request.headers.get("x-forwarded-host")); */

    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
