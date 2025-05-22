import prisma from '@/lib/prisma';

async function updateAdmin() {
  try {
    const admin = await prisma.user.update({
      where: {
        username: 'haja'
      },
      data: {
        isSuperAdmin: true
      }
    });
    console.log('Admin updated successfully:', admin);
  } catch (error) {
    console.error('Error updating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdmin(); 