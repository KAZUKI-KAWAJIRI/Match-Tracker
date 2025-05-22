'use client'

import { LogoutButton } from '@/components/auth/LogoutButton'
import { DuelForm } from '@/components/DuelForm'
import { DuelRecords } from '@/components/DuelRecords'
import { useAuth } from '@/lib/hooks/useAuth'
import { useDuel } from '@/lib/context'
import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ユーザー情報を表示するコンポーネント
function UserInfoCard() {
  const { session, isAuthenticated } = useAuth();
  const { storageKey } = useDuel();
  
  const userEmail = session?.user?.email;
  const userId = session?.user?.id;
  
  const greeting = useMemo(() => {
    if (userEmail) return `${userEmail}さん`;
    return '';
  }, [userEmail]);

  const authStatusText = useMemo(() => {
    if (isAuthenticated) {
      const idPreview = userId ? `(ID: ${userId.substring(0, 8)}...)` : '';
      return `認証済み ${idPreview}`;
    }
    return '未認証';
  }, [isAuthenticated, userId]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">ようこそ！{greeting}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          マスターデュエル戦績トラッカーへようこそ。このページでは対戦結果を記録・分析できます。
        </p>
        <p className="mb-4">
          以下のフォームで対戦結果を入力してください。ログインしているため、データはアカウントに紐づけて保存されます。
        </p>
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">ログイン状態:</span> {authStatusText}
          </p>
          <p className="text-blue-800 text-sm mt-1">
            <span className="font-semibold">データ保存先:</span> {storageKey}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Match Tracker - ダッシュボード</h1>
        <div className="w-32">
          <LogoutButton />
        </div>
      </div>
      
      {/* ユーザー情報カード */}
      <UserInfoCard />
      
      {/* 入力フォーム */}
      <DuelForm />
      
      {/* 戦績記録 */}
      <div className="mt-10">
        <DuelRecords />
      </div>
    </div>
  )
} 