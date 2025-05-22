'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDuel } from '@/lib/context';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';

export function ImportButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { isLocalStorage, importToDatabase, records } = useDuel();
  const { isAuthenticated } = useAuth();

  const handleImport = async () => {
    if (!records.length) {
      setMessage({ text: 'インポートするデータがありません', type: 'error' });
      return;
    }

    try {
      setIsImporting(true);
      setMessage(null);

      const result = await importToDatabase();
      
      if (result.success) {
        setMessage({ text: result.message, type: 'success' });
      } else {
        setMessage({ text: result.message || 'インポートに失敗しました', type: 'error' });
      }
    } catch (error) {
      console.error('インポートエラー:', error);
      setMessage({ text: 'インポート中にエラーが発生しました', type: 'error' });
    } finally {
      setIsImporting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setMessage(null);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setOpen(true)}
        disabled={!isAuthenticated}
      >
        {isLocalStorage ? 'ローカルストレージ' : 'データベース'}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>データ保存先の変更</DialogTitle>
            <DialogDescription>
              現在のデータ保存先は <strong>{isLocalStorage ? 'ローカルストレージ' : 'データベース'}</strong> です。
            </DialogDescription>
          </DialogHeader>

          <div className="p-4">
            {message && (
              <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <p className="mb-4">
              {isLocalStorage
                ? 'ローカルストレージのデータをデータベースにインポートすると、サインインした状態でどのデバイスからもアクセスできるようになります。'
                : 'データはすでにデータベースに保存されています。複数のデバイスでアクセス可能です。'}
            </p>

            {records.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                インポート可能なレコード: {records.length}件
              </p>
            )}
          </div>

          <DialogFooter>
            {isLocalStorage && isAuthenticated && (
              <Button 
                onClick={handleImport} 
                disabled={isImporting || records.length === 0}
              >
                {isImporting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />
                    処理中...
                  </span>
                ) : (
                  'データベースにインポート'
                )}
              </Button>
            )}
            <Button variant="secondary" onClick={() => setOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 