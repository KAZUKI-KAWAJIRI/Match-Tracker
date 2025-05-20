# マッチトラッカー（Match Tracker）

![バージョン](https://img.shields.io/badge/version-1.0.0-blue)
![ライセンス](https://img.shields.io/badge/license-MIT-green)

マッチトラッカーは、カードゲームやeスポーツにおける試合記録と統計分析を簡単に行えるウェブアプリケーションです。コイントス結果、先攻/後攻、勝敗などを記録し、勝率や各種傾向を可視化します。

## 📋 主な機能

- **デュエル記録**: コイントス、先攻/後攻、勝敗、使用デッキなどを記録
- **統計分析**: 勝率や先攻/後攻の成績など、さまざまな統計情報を自動計算
- **カスタマイズ**: デッキ名やプレイヤー情報のカスタマイズ
- **オフライン対応**: ローカルストレージを使用し、オフラインでも使用可能
- **レスポンシブデザイン**: モバイルからデスクトップまで、あらゆるデバイスに対応

## 🖥️ スクリーンショット

![アプリのスクリーンショット](/images/app-screenshot0.png)
![アプリのスクリーンショット](/images/app-screenshot1.png)


## 🛠️ 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) - ReactベースのWebフレームワーク
- **言語**: [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストのCSSフレームワーク
- **コンポーネント**: [shadcn/ui](https://ui.shadcn.com/) - 再利用可能なUIコンポーネント
- **開発ツール**: [Biome](https://biomejs.dev/) - 高速なLinterとFormatter

将来的な追加予定:
- **バックエンド**: [Supabase](https://supabase.io/) - バックエンドとデータベース
- **ORM**: [Prisma](https://www.prisma.io/) - 次世代のORMツール

## 📦 インストールと実行

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

### 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/KAZUKI-KAWAJIRI/Match-Tracker.git
cd Match-Tracker

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションにアクセスできます。

### 環境変数 (将来的なバックエンド接続用)

`.env` ファイルを作成し、以下の環境変数を設定してください：

```
DATABASE_URL="your-database-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## 🚀 デプロイ

Next.jsアプリケーションは、Vercel、Netlify、GitHub Pagesなど様々なプラットフォームにデプロイできます。

```bash
# 本番用ビルドの作成
npm run build

# ビルドしたアプリの起動
npm start
```

## 📊 使用方法

1. ホーム画面でデュエル情報（コイン結果、先攻/後攻、勝敗など）を入力
2. 「記録する」ボタンをクリックして保存
3. 下部の統計セクションで自動計算された勝率や各種統計を確認
4. 日付ごとのフィルタリングで過去の記録を閲覧

## 🔮 将来の計画

- **ユーザー認証**: マルチユーザー対応とプロフィール管理
- **クラウド同期**: 複数デバイス間でのデータ同期
- **詳細統計**: 高度なフィルタリングとグラフ表示
- **API対応**: 外部サービスとの連携
- **ソーシャル機能**: フレンドとの対戦記録の共有

## ⚖️ ライセンス

[MIT](https://choosealicense.com/licenses/mit/) ライセンスの下で配布されています。

---