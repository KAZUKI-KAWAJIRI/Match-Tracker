import { SignIn } from '@/components/auth/SignIn';

export default function LoginPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Match Tracker - ログイン
      </h1>
      <SignIn />
    </div>
  );
}
