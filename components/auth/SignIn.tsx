'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn, status, isAuthenticated } = useAuth();

  useEffect(() => {
    // ユーザーが認証済みの場合はダッシュボードにリダイレクト
    if (isAuthenticated) {
      console.log(
        'ユーザーは既に認証済みです。ダッシュボードへリダイレクトします。',
      );
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      console.log('ログイン処理を開始します', email);
      const { success, error: signInError } = await signIn(email, password);

      if (!success && signInError) {
        throw new Error(signInError);
      }

      console.log('ログイン成功');

      // 認証成功後、数秒待機してからリダイレクト
      // これによりサーバーとの同期を確保
      setTimeout(() => {
        console.log('ダッシュボードへリダイレクトします');
        router.push('/dashboard');
      }, 500);
    } catch (error: any) {
      console.error('ログインエラー:', error);
      setError(
        error.message || 'ログインに失敗しました。もう一度お試しください。',
      );
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>Match Trackerアカウントにログインする</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          {error && (
            <div className="p-3 text-sm rounded bg-red-100 text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              メールアドレス
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                パスワード
              </label>
              <Link
                href="/reset-password"
                className="text-xs text-blue-600 hover:underline"
              >
                パスワードをお忘れですか？
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />
                ログイン中...
              </span>
            ) : (
              'ログイン'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          アカウントをお持ちでない場合は
          <Link href="/signup" className="text-blue-600 hover:underline ml-1">
            新規登録
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
