-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REGULER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isAdmin" "Role" NOT NULL DEFAULT 'REGULER';
