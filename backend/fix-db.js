const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDatabase() {
  try {
    // Add role column if it doesn't exist
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'staff';
    `);
    console.log('✅ Role column added successfully');
    
    // Verify
    const users = await prisma.user.findMany();
    console.log(`✅ Found ${users.length} users in database`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabase();
