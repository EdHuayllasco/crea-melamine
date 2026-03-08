import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Crea Melamine | Muebles de Melamina a Medida en Lima',
  description:
    'Fabricamos muebles de melamina personalizados: cocinas integrales, placards, vestidores y muebles de oficina. 15+ anos de experiencia en Lima, Peru.',
  keywords: ['melamina', 'muebles', 'cocinas integrales', 'vestidores', 'Lima', 'Peru'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
