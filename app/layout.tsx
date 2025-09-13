
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CL在菲活動策劃 - 菲律賓專業活動策劃 | 婚禮策劃 | 企業活動",
    template: "%s | CL在菲活動策劃"
  },
  description: "菲律賓頂級活動策劃公司，專業提供婚禮策劃、企業年會、商業開幕、品牌發表會等全方位活動規劃服務。深耕菲律賓5年，為華語客戶打造獨特難忘的活動體驗。",
  keywords: ["菲律賓活動策劃", "婚禮策劃", "企業活動", "商業開幕", "品牌發表會", "活動規劃", "馬尼拉活動策劃", "CL Events", "Philippines event planning", "華語活動策劃"],
  authors: [{ name: "CL Events Philippines" }],
  creator: "CL Events Philippines",
  publisher: "CL Events Philippines",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    languages: {
      'zh-TW': '/',
      'en': '/'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: 'en_US',
    url: 'https://cleventsphilippines.com',
    siteName: 'CL在菲活動策劃',
    title: 'CL在菲活動策劃 - 菲律賓專業活動策劃 | 婚禮策劃 | 企業活動',
    description: '菲律賓頂級活動策劃公司，專業提供婚禮策劃、企業年會、商業開幕、品牌發表會等全方位活動規劃服務。深耕菲律賓5年，為華語客戶打造獨特難忘的活動體驗。',
    images: [
      {
        url: 'https://readdy.ai/api/search-image?query=Professional%20event%20planning%20company%20logo%20CL%20Events%20Philippines%20luxury%20elegant%20modern%20design&width=1200&height=630&seq=og-image&orientation=landscape',
        width: 1200,
        height: 630,
        alt: 'CL Events Philippines - 專業活動策劃公司'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cleventsph',
    creator: '@cleventsph',
    title: 'CL在菲活動策劃 - 菲律賓專業活動策劃',
    description: '菲律賓頂級活動策劃公司，專業提供婚禮策劃、企業活動等全方位活動規劃服務。',
    images: ['https://readdy.ai/api/search-image?query=Professional%20event%20planning%20company%20logo%20CL%20Events%20Philippines%20luxury%20elegant%20modern%20design&width=1200&height=630&seq=twitter-image&orientation=landscape']
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'baidu-site-verification': 'your-baidu-verification-code'
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning={true}>
      <head>
        <link rel="canonical" href="https://cleventsphilippines.com" />
        <meta name="geo.region" content="PH" />
        <meta name="geo.placename" content="Manila, Philippines" />
        <meta name="geo.position" content="14.5995;120.9842" />
        <meta name="ICBM" content="14.5995, 120.9842" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
