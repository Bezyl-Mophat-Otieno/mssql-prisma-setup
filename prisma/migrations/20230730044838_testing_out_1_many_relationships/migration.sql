/*
  Warnings:

  - You are about to drop the `_OrdersToProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_OrdersToProducts] DROP CONSTRAINT [_OrdersToProducts_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_OrdersToProducts] DROP CONSTRAINT [_OrdersToProducts_B_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [Orders_customerId_fkey];

-- DropTable
DROP TABLE [dbo].[_OrdersToProducts];

-- DropTable
DROP TABLE [dbo].[Customers];

-- DropTable
DROP TABLE [dbo].[Orders];

-- DropTable
DROP TABLE [dbo].[Products];

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Order_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
