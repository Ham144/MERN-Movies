/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usename` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "usename",
ADD COLUMN     "username" VARCHAR(100) NOT NULL,
ALTER COLUMN "isAdmin" DROP NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
