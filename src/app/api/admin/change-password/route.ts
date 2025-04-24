import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminPassword, updateAdminPassword } from '@/lib/db/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Get admin credentials from cookies
    const cookieStore = cookies();
    const adminName = cookieStore.get('adminName')?.value;
    const isAdmin = cookieStore.get('isAdmin')?.value === 'true';

    // Check if user is admin
    if (!isAdmin || !adminName) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify current password
    const isValidPassword = await verifyAdminPassword(adminName, currentPassword);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Update password
    const success = await updateAdminPassword(adminName, newPassword);
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to update password' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Password changed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { message: 'Failed to change password' },
      { status: 500 }
    );
  }
} 