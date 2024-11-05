import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
export const metadata = {
  title: 'Football Seat Reservation',
  description: 'Online Football Ticket Reservation',
  icons: {icon: '/football.png'}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <ClerkProvider>
      
    <html lang="en">       
      <body>
  
        <SignedOut>
          </SignedOut>
            <SignedIn>
            </SignedIn>

        {children}</body>  
    </html>
    </ClerkProvider>  
  )
}
