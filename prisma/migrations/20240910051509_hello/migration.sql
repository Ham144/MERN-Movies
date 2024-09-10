/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "usename" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "isAdmin" "Role" NOT NULL DEFAULT 'REGULER',
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(50),

    CONSTRAINT "user_pkey" PRIMARY KEY ("usename")
);
