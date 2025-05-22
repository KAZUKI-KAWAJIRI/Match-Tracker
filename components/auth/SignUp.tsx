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

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp, status, isAuthenticated } = useAuth();

  useEffect(() => {
    // ユーザーが認証済みの場合はダッシュボードにリダイレクト
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('すべての項目を入力してください');
      return;
    }

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const { success, error: signUpError } = await signUp(email, password);

      if (!success && signUpError) {
        throw new Error(signUpError);
      }

      setSuccess(true);
      // 成功メッセージを表示
    } catch (error: any) {
      console.error('アカウント作成エラー:', error);
      setError(
        error.message ||
          'アカウント作成に失敗しました。もう一度お試しください。',
      );
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>登録完了</CardTitle>
          <CardDescription>確認メールを送信しました</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p>
              {email}{' '}
              宛に確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。
            </p>
            <Button onClick={() => router.push('/login')} className="mt-4">
              ログインページへ
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>アカウント作成</CardTitle>
        <CardDescription>Match Trackerに新規登録する</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
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
            <label htmlFor="password" className="text-sm font-medium">
              パスワード
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを設定"
              required
              autoComplete="new-password"
            />
            <p className="text-xs text-gray-500">8文字以上で設定してください</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              パスワード（確認）
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="パスワードを再入力"
              required
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                登録中...
              </span>
            ) : (
              'アカウント作成'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          すでにアカウントをお持ちの場合は
          <Link href="/login" className="text-blue-600 hover:underline ml-1">
            ログイン
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
