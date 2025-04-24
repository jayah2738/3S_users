import { hash } from 'bcryptjs';
import { db } from '../src/lib/db/db';

async function main() {
  const name = 'admin';
  const password = 'admin123'; // Change this to a secure password in production

  const hashedPassword = await hash(password, 12);

  try {
    await db.admin.upsert({
      where: { name },
      update: {},
      create: {
        name,
        password: hashedPassword,
      },
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await db.$disconnect();
  }
}

main(); 