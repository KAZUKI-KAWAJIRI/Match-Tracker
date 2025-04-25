# Match Tracker

試合の記録や統計を管理するためのアプリケーションです。

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストのCSSフレームワーク
- [Supabase](https://supabase.io/) - オープンソースのFirebase代替
- [Prisma](https://www.prisma.io/) - 次世代のORMツール
- [shadcn/ui](https://ui.shadcn.com/) - 再利用可能なUIコンポーネント
- [Biome](https://biomejs.dev/) - 高速なLinterとFormatter

## セットアップ方法

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 環境変数

`.env` ファイルを作成し、以下の環境変数を設定してください：

```
DATABASE_URL="your-database-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## 開発

```bash
# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番環境でのサーバー起動
npm start

# リント
npm run lint
```

## ライセンス

[MIT](https://choosealicense.com/licenses/mit/) 