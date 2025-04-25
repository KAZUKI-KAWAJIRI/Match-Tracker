import { DuelForm } from '@/components/DuelForm'
import { DuelRecords } from '@/components/DuelRecords'

export default function Home() {
  return (
    <main className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6">マスターデュエル戦績メモ</h1>
      
      {/* 入力フォーム */}
      <DuelForm />
      
      {/* 戦績記録 */}
      <DuelRecords />
    </main>
  )
} 