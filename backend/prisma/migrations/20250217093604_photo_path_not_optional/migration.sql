/*
  Warnings:

  - Made the column `photo_path` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "photo_path" SET NOT NULL;
