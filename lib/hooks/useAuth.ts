'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { type Session } from '@supabase/supabase-js'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const sessionCheckCompleted = useRef(false)
  const isMounted = useRef(true)

  // コンポーネントのマウント状態を追跡
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // セッションチェック
  const checkSession = useCallback(async () => {
    if (sessionCheckCompleted.current) return

    try {
      if (isMounted.current) setStatus('loading')
      console.log('useAuth: セッションチェック開始')
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      
      if (isMounted.current) {
        setSession(currentSession)
        setStatus(currentSession ? 'authenticated' : 'unauthenticated')
      }
      console.log('useAuth: セッションチェック完了', currentSession ? '認証済み' : '未認証')
    } catch (err: any) {
      console.error('useAuth: セッションチェックエラー', err)
      if (isMounted.current) {
        setError(err.message || '認証状態の確認に失敗しました')
        setStatus('unauthenticated')
      }
    } finally {
      sessionCheckCompleted.current = true
    }
  }, [supabase])

  // セッションリフレッシュ
  const refreshSessionStatus = useCallback(async () => {
    console.log('useAuth: セッション状態をリフレッシュします')
    sessionCheckCompleted.current = false
    return checkSession()
  }, [checkSession])

  // ログイン
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      if (isMounted.current) setError(null)
      console.log('useAuth: ログイン処理開始')
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (signInError) throw signInError
      
      // ログイン成功時に状態を更新
      await refreshSessionStatus()
      console.log('useAuth: ログイン成功')
      
      return { success: true, error: null }
    } catch (err: any) {
      console.error('useAuth: ログインエラー', err)
      if (isMounted.current) {
        setError(err.message || 'ログインに失敗しました')
      }
      return { success: false, error: err.message || 'ログインに失敗しました' }
    }
  }, [supabase, refreshSessionStatus])

  // 新規登録
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      if (isMounted.current) setError(null)
      console.log('useAuth: アカウント登録開始')
      
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (signUpError) throw signUpError
      
      console.log('useAuth: アカウント登録成功')
      return { success: true, error: null }
    } catch (err: any) {
      console.error('useAuth: アカウント登録エラー', err)
      if (isMounted.current) {
        setError(err.message || 'アカウント登録に失敗しました')
      }
      return { success: false, error: err.message || 'アカウント登録に失敗しました' }
    }
  }, [supabase])

  // ログアウト
  const signOut = useCallback(async () => {
    try {
      console.log('useAuth: ログアウト処理開始')
      
      // ログアウト前に状態を更新（すぐに反映させるため）
      if (isMounted.current) {
        setSession(null)
        setStatus('unauthenticated')
      }
      
      // クライアント側でサインアウト
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) {
        console.error('useAuth: クライアント側ログアウトエラー', signOutError)
        throw signOutError;
      }
      
      console.log('useAuth: クライアント側ログアウト成功')
      
      // 確実にセッション情報をクリア
      if (isMounted.current) {
        setSession(null)
        setStatus('unauthenticated')
      }
      
      return { success: true, error: null }
    } catch (err: any) {
      console.error('useAuth: ログアウトエラー', err)
      
      // エラー時にも状態をリセット（安全のため）
      if (isMounted.current) {
        setError(err.message || 'ログアウトに失敗しました')
        setSession(null)
        setStatus('unauthenticated')
      }
      
      return { success: false, error: err.message }
    }
  }, [supabase])

  // 認証状態の監視
  useEffect(() => {
    // 初回マウント時にセッションをチェック
    checkSession()

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('useAuth: 認証状態変更:', event, currentSession ? 'セッションあり' : 'セッションなし')
      
      if (!isMounted.current) return
      
      if (event === 'SIGNED_IN') {
        setSession(currentSession)
        setStatus('authenticated')
        console.log('useAuth: サインイン検出 → 認証済み状態に更新')
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        setStatus('unauthenticated')
        console.log('useAuth: サインアウト検出 → 未認証状態に更新')
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(currentSession)
        if (currentSession) {
          setStatus('authenticated')
          console.log('useAuth: トークンリフレッシュ検出 → 認証済み状態に更新')
        }
      }
    })

    return () => {
      isMounted.current = false
      subscription.unsubscribe()
    }
  }, [supabase, checkSession])

  return {
    status,
    session,
    error,
    signIn,
    signUp,
    signOut,
    refreshSessionStatus,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated'
  }
} 