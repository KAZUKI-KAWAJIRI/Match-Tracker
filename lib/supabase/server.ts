import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
});
