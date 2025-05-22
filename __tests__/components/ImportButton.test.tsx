/// <reference path="../global.d.ts" />
/// <reference path="../module-declarations.d.ts" />

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ImportButton } from '@/components/ImportButton'
import { useDuel } from '@/lib/context'
import { useAuth } from '@/lib/hooks/useAuth'

// モックの設定
jest.mock('@/lib/context', () => ({
  useDuel: jest.fn(),
}))

jest.mock('@/lib/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}))

describe('ImportButton Component', () => {
  // 各テストの前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('ローカルストレージモードの場合、インポートボタンを表示する', () => {
    // モックの戻り値を設定
    ;(useDuel as jest.Mock).mockReturnValue({
      isLocalStorage: true,
      importToDatabase: jest.fn(),
      records: [{ id: '1', date: new Date() }],
    })
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    })

    render(<ImportButton />)
    
    // ボタンをクリックしてダイアログを表示
    const button = screen.getByText('ローカルストレージ')
    fireEvent.click(button)
    
    // ダイアログのタイトルが表示されることを確認
    expect(screen.getByText('データ保存先の変更')).toBeInTheDocument()
    
    // インポートボタンが存在することを確認
    expect(screen.getByText('データベースにインポート')).toBeInTheDocument()
  })

  test('データベースモードの場合、インポートボタンを表示しない', () => {
    // モックの戻り値を設定
    ;(useDuel as jest.Mock).mockReturnValue({
      isLocalStorage: false,
      importToDatabase: jest.fn(),
      records: [{ id: '1', date: new Date() }],
    })
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    })

    render(<ImportButton />)
    
    // ボタンをクリックしてダイアログを表示
    const button = screen.getByText('データベース')
    fireEvent.click(button)
    
    // ダイアログのタイトルが表示されることを確認
    expect(screen.getByText('データ保存先の変更')).toBeInTheDocument()
    
    // インポートボタンが存在しないことを確認
    expect(screen.queryByText('データベースにインポート')).not.toBeInTheDocument()
  })

  test('インポート処理が成功した場合、成功メッセージを表示する', async () => {
    const mockImportToDatabase = jest.fn().mockResolvedValue({
      success: true,
      message: 'インポートに成功しました',
    })
    
    // モックの戻り値を設定
    ;(useDuel as jest.Mock).mockReturnValue({
      isLocalStorage: true,
      importToDatabase: mockImportToDatabase,
      records: [{ id: '1', date: new Date() }],
    })
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    })

    render(<ImportButton />)
    
    // ボタンをクリックしてダイアログを表示
    const button = screen.getByText('ローカルストレージ')
    fireEvent.click(button)
    
    // インポートボタンをクリック
    const importButton = screen.getByText('データベースにインポート')
    fireEvent.click(importButton)
    
    // 成功メッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText('インポートに成功しました')).toBeInTheDocument()
    })
    
    // インポート関数が呼び出されたことを確認
    expect(mockImportToDatabase).toHaveBeenCalledTimes(1)
  })
}) 