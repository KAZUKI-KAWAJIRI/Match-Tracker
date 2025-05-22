'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, refreshSessionStatus } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // 認証ページかどうかを判定
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // セッションの検証
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        console.log('AuthGuard: セッション検証開始', {
          isAuthPage,
          isLoading,
          isAuthenticated,
        });

        // 認証ページならローディングを解除してリターン
        if (isAuthPage) {
          if (isMounted) setLocalLoading(false);
          return;
        }

        // セッションを直接チェック（二重チェック）
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isLoading) {
          // 未認証ならログインページへ
          if (!isAuthenticated && !isAuthPage) {
            console.log(
              'AuthGuard: 未認証状態を検出、ログインページへリダイレクト',
            );
            if (isMounted) router.push('/login');
            return;
          }

          // 認証済みなら、ローディングを解除
          if (isAuthenticated || session) {
            console.log('AuthGuard: 認証済み状態を確認');
            if (isMounted) setLocalLoading(false);
          }
        }
      } catch (error) {
        console.error('セッション検証エラー:', error);
        if (!isAuthPage && isMounted) {
          router.push('/login');
        }
      }
    };

    verifySession();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthGuard: 認証状態変更:', event, !!session);

      if (event === 'SIGNED_OUT' && !isAuthPage) {
        console.log(
          'AuthGuard: サインアウト検出、ログインページへリダイレクト',
        );
        if (isMounted) {
          refreshSessionStatus();
          router.push('/login');
        }
      } else if (event === 'SIGNED_IN' && isAuthPage) {
        console.log('AuthGuard: サインイン検出、ダッシュボードへリダイレクト');
        if (isMounted) {
          refreshSessionStatus();
          router.push('/dashboard');
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [
    isAuthPage,
    router,
    isAuthenticated,
    isLoading,
    supabase,
    refreshSessionStatus,
  ]);

  // 認証ページには保護をかけない（ログインページなど）
  if (isAuthPage) {
    return <>{children}</>;
  }

  // ローディング中は表示
  if (isLoading || localLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        <p className="ml-3">読み込み中...</p>
      </div>
    );
  }

  // 認証済みの場合のみコンテンツを表示
  return isAuthenticated ? <>{children}</> : null;
}
