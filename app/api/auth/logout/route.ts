import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('ログアウトAPI: 処理開始');

    // Next.js 15の正しいcookies APIの使用方法
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    // サーバーサイドでログアウト処理を実行
    await supabase.auth.signOut();
    console.log('ログアウトAPI: サインアウト処理完了');

    // Next.js 15のcookie削除方法に従う
    const response = NextResponse.json(
      { success: true, message: 'ログアウトしました' },
      { status: 200 },
    );

    // クッキーを削除（シンプルにして安全な方法）
    response.headers.set(
      'Set-Cookie',
      `sb-refresh-token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
    );

    response.headers.set(
      'Set-Cookie',
      `sb-access-token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
    );

    return response;
  } catch (error) {
    console.error('ログアウト処理中にエラーが発生しました:', error);
    return NextResponse.json(
      { success: false, error: 'ログアウトに失敗しました' },
      { status: 500 },
    );
  }
}
