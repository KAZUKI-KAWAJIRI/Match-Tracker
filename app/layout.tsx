import React from 'react'
import './globals.css'
import { DuelProvider } from '@/lib/context'

export const metadata = {
  title: 'Match Tracker - マスターデュエル戦績',
  description: '遊戯王マスターデュエルの戦績を記録・管理するアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <DuelProvider>
          {children}
        </DuelProvider>
      </body>
    </html>
  )
} 