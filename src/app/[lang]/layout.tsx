import '@/app/[lang]/globals.css';

import { Locale, i18n } from '@/i18n/settings';
import { Poppins } from 'next/font/google';

//Fontlar buradan, /next/font/google paketi kullanılarak eklenebilir
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ["400", "500"],
  variable: "--font-poppins"
});

export const metadata = {
  title: 'Remote Site',
  description: 'Remote Site Web App',
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang: lang }));
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    lang: Locale
  } 
}) {
  const { lang } = params;
  
  return (
    <html lang={lang} className={poppins.variable}>
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  )
}
