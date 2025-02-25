import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/dashboard/instructor', '/dashboard/admin']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Role-based access control
  if (session && isProtectedPath) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const path = request.nextUrl.pathname
    const role = user?.role

    // Redirect if user tries to access unauthorized dashboard
    if (path.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (path.startsWith('/dashboard/instructor') && role !== 'instructor') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (path === '/dashboard' && role !== 'student') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/auth/:path*'
  ]
}