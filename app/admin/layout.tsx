import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio Admin Dashboard',
  icons: {
    icon: [{ url: "/boxinglogo.png", type: "image/png" }],
    apple: "/boxinglogo.png",
    shortcut: "/boxinglogo.png",
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
