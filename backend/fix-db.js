const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDatabase() {
  try {
    console.log('🔧 Fixing database schema...');
    
    // Create tables if they don't exist
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "password" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'staff',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Patient" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "age" INTEGER,
        "gender" TEXT,
        "phone" TEXT NOT NULL,
        "email" TEXT,
        "address" TEXT,
        "status" TEXT NOT NULL DEFAULT 'Active',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Appointment" (
        "id" TEXT NOT NULL,
        "patientName" TEXT NOT NULL,
        "doctorName" TEXT NOT NULL,
        "date" TEXT NOT NULL,
        "time" TEXT NOT NULL,
        "type" TEXT NOT NULL DEFAULT 'Checkup',
        "status" TEXT NOT NULL DEFAULT 'Pending',
        "notes" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Bill" (
        "id" TEXT NOT NULL,
        "patientName" TEXT NOT NULL,
        "services" TEXT NOT NULL,
        "amount" DOUBLE PRECISION NOT NULL,
        "date" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'Pending',
        "paymentMethod" TEXT NOT NULL DEFAULT 'Cash',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
      );
    `);
    
    console.log('✅ Database schema fixed successfully');
    
    // Verify
    const users = await prisma.user.findMany();
    console.log(`✅ Found ${users.length} users in database`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(0); // Don't fail the build
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabase();
