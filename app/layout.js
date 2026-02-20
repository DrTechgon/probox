import './globals.css'
import ChatWidget from '@/components/chat/ChatWidget'

export const metadata = {
  title: 'PROBOX | SIMPLICITY - We Make I.T Simple',
  description: 'We are a leading customized customer experience (CX) innovators who design, build and deliver personalized next-gen I.T services for global and disruptive brands.',
  keywords: 'IT services, managed IT services, cloud services, cybersecurity, artificial intelligence, IIoT, network management, digital transformation, customer experience, CX',
  openGraph: {
    title: 'PROBOX | We Make I.T Simple',
    description: 'Leading CX innovators delivering personalized next-gen I.T services for global brands.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
