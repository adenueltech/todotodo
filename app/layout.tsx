import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Define metadata for better SEO
export const metadata: Metadata = {
  title: "Todo Universe | Beautiful 3D Animated Todo App",
  description:
    "A stunning, feature-rich todo application with 3D animations, priority management, reminders, and a beautiful UI. Organize your tasks with style.",
  keywords: ["todo app", "task management", "3D animations", "productivity tool", "reminders", "task organizer"],
  authors: [{ name: "AdeNuelTech", url: "https://github.com/adenueltech" }],
  creator: "AdeNuelTech",
  publisher: "AdeNuelTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://todo-universe.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Todo Universe | Beautiful 3D Animated Todo App",
    description:
      "A stunning, feature-rich todo application with 3D animations, priority management, reminders, and a beautiful UI.",
    url: "https://todo-universe.vercel.app",
    siteName: "Todo Universe",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Todo Universe App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Todo Universe | Beautiful 3D Animated Todo App",
    description:
      "A stunning, feature-rich todo application with 3D animations, priority management, reminders, and a beautiful UI.",
    images: ["/twitter-image.png"],
    creator: "@adenueltech",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5CF6" },
    { media: "(prefers-color-scheme: dark)", color: "#4C1D95" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "productivity",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Structured data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Todo Universe",
              description:
                "A stunning, feature-rich todo application with 3D animations, priority management, reminders, and a beautiful UI.",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "AdeNuelTech",
                url: "https://github.com/adenueltech",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
