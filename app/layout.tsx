import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal OS Dashboard | Kyle Guilfoyle - Restaurant Growth Systems",
  description: "Live dashboard showing real-time business metrics, growth tracking, and systems thinking in action. See how Kyle Guilfoyle builds Growth Operating Systems for restaurants through transparent, data-driven personal operations.",
  keywords: ["Kyle Guilfoyle", "Personal Dashboard", "Growth Operating Systems", "Restaurant Marketing", "Business Systems", "Real-time Analytics", "Personal OS"],
  authors: [{ name: "Kyle Guilfoyle", url: "https://kyleguilfoyle.com" }],
  creator: "Kyle Guilfoyle",
  publisher: "Kyle Guilfoyle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kyleguilfoyle.com/dashboard",
    title: "Personal OS Dashboard | Kyle Guilfoyle",
    description: "Live dashboard demonstrating systems thinking and Growth Operating Systems in action. Real-time business metrics, learning progress, and transparent operations.",
    siteName: "Kyle Guilfoyle - Restaurant Growth Systems",
    images: [
      {
        url: "https://kyleguilfoyle.com/dashboard/images/personal-os-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Kyle Guilfoyle Personal OS Dashboard - Growth Operating Systems in Action",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal OS Dashboard | Kyle Guilfoyle",
    description: "Live dashboard showing Growth Operating Systems in action. See real-time business metrics and systems thinking applied to personal operations.",
    creator: "@kyleguilfoyle",
    images: ["https://kyleguilfoyle.com/dashboard/images/personal-os-preview.jpg"],
  },
  alternates: {
    canonical: "https://kyleguilfoyle.com/dashboard",
  },
  other: {
    'application-ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Personal OS Dashboard",
      "description": "Real-time personal operating system dashboard demonstrating Growth Operating Systems methodology",
      "url": "https://kyleguilfoyle.com/dashboard",
      "author": {
        "@type": "Person",
        "name": "Kyle Guilfoyle",
        "url": "https://kyleguilfoyle.com",
        "jobTitle": "Restaurant Growth Systems Consultant",
        "knowsAbout": ["Restaurant Marketing", "Growth Operating Systems", "Business Systems", "Data Analytics"]
      },
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Modern web browser with JavaScript enabled"
    })
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://kyleguilfoyle.com/dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
        <link rel="icon" href="/dashboard/favicon.ico" />
        <link rel="apple-touch-icon" href="/dashboard/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
