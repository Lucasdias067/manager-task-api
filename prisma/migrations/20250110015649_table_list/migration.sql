/*
  Warnings:

  - The `items` column on the `List` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "items",
ADD COLUMN     "items" TEXT[];
