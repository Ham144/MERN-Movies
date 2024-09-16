-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_movieId_fkey";

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "movieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
