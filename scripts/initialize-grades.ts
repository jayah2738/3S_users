import { initializeGrades } from '../src/lib/db/admin';

async function main() {
  try {
    await initializeGrades();
    console.log('Grades initialized successfully');
  } catch (error) {
    console.error('Error initializing grades:', error);
    process.exit(1);
  }
}

main(); 