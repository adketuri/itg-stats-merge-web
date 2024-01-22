import { Metadata } from 'next'
import { fonts } from './fonts'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "Stats Merger",
  description: "Stats merging tool for ITGMania",
}

export default function RootLayout({ children }: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
      <body style={{ backgroundColor: "#eee" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}