'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      console.log('ログアウト処理を開始します');

      // APIエンドポイントを直接呼び出してログアウト
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        console.log('APIログアウトレスポンス:', data);

        if (!data.success) {
          console.warn('API ログアウトがエラーを返しました:', data);
          // APIでエラーが発生した場合はフォールバックとしてuseAuthのsignOutを使用
          await signOut();
        }
      } catch (apiError) {
        console.error('API ログアウト呼び出しエラー:', apiError);
        // APIでエラーが発生した場合はフォールバックとしてuseAuthのsignOutを使用
        await signOut();
      }

      console.log('ログアウト成功、ホームページにリダイレクトします');

      // ローカルストレージをクリア（必要に応じて）
      localStorage.removeItem('supabase.auth.token');

      // 完全なページリロードでキャッシュをクリア
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error);
      alert(
        'ログアウト中にエラーが発生しました。ページをリロードして再度お試しください。',
      );

      // エラー発生時も最終手段としてリダイレクト
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full justify-start"
    >
      {isLoading ? 'ログアウト中...' : 'ログアウト'}
    </Button>
  );
}
