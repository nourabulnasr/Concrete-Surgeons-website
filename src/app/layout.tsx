import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://csmisr.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
