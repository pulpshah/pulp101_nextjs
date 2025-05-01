// ============================================
// File Purpose: Route handler for /account that checks auth before rendering profile
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 05/01/2025
// ============================================

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@/components/account/ProfilePage'), { ssr: false });

export default async function AccountRoute() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  return <ProfilePage />;
}
