-- AlterTable
ALTER TABLE "User" ADD COLUMN     "certificatePath" TEXT,
ADD COLUMN     "expertise" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
