-- Add role column to User table if it doesn't exist
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'staff';
