import { DuelForm } from '@/components/DuelForm';
import { DuelRecords } from '@/components/DuelRecords';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">マスターデュエル戦績メモ</h1>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline">ログイン</Button>
          </Link>
          <Link href="/signup">
            <Button>新規登録</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Match Trackerへようこそ！
        </h2>
        <p className="mb-4">
          このアプリケーションでは、マスターデュエルの対戦結果を記録・分析することができます。
          アカウントを作成して、あなたの戦績を管理しましょう！
        </p>
        <div className="flex space-x-4 mt-6">
          <Link href="/signup">
            <Button size="lg">今すぐ始める</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">
              ログイン
            </Button>
          </Link>
        </div>
      </div>

      {/* 入力フォーム */}
      <DuelForm />

      {/* 戦績記録 */}
      <DuelRecords />
    </main>
  );
}
