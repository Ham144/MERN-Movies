-- CreateTable
CREATE TABLE "user" (
    "usename" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(50),

    CONSTRAINT "user_pkey" PRIMARY KEY ("usename")
);
