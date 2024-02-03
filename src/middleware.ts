import acceptLanguage from 'accept-language'
import { 
  NextRequest, 
  NextResponse 
} from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { i18n } from '@/i18n/settings';

acceptLanguage.languages(i18n.locales.concat());

const cookieName = 'remote-site-lang';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const { data: session } = await supabase.auth.getSession();

  if (pathname.indexOf('icon') > -1 || pathname.indexOf('chrome') > -1) return res;

  const isLocaleValid = i18n.locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname.startsWith(`/${locale}`));
  
  let lng;
  if (isLocaleValid) lng = pathname.split('/')[1];
  if (!lng && req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = i18n.defaultLocale;

  res.cookies.set(cookieName, lng);

  const loginURL = `/${lng}/login`;

  //If user is not authenticated, redirect to login page
  if(!session.session?.user && !req.nextUrl.pathname.startsWith(loginURL)){
    const redirectUrl = req.nextUrl.clone();
    
    redirectUrl.pathname = loginURL;
    return NextResponse.redirect(redirectUrl);
  }
  //If user is authenticated and wants to go to login page, redirect to main page
  else if(session.session?.user && req.nextUrl.pathname.startsWith(loginURL)){
    return NextResponse.redirect(new URL('/', req.url));
  }

  const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
  
  if (pathnameIsMissingLocale) return NextResponse.redirect(new URL(`/${lng}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url));

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}