import './globals.css'

export const metadata = {
  title: 'Probox Infotech | Empowering Digital Excellence',
  description: 'We transform businesses through innovative technology solutions, driving growth and efficiency in the digital age. Partner with us for web development, mobile apps, cloud solutions, and more.',
  keywords: 'IT services, web development, mobile app development, cloud solutions, digital transformation, IT consulting, cybersecurity',
  openGraph: {
    title: 'Probox Infotech | Empowering Digital Excellence',
    description: 'Transform your business with our innovative technology solutions.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
