-- CreateTable
CREATE TABLE "SavedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT,
    "item" TEXT,
    "quantity" TEXT,
    "amount" TEXT,
    "currency" TEXT,
    "valueOfFund" TEXT,
    "sourceOfFund" TEXT,
    "purposeOfFund" TEXT,
    "cert" TEXT,
    "hsCode" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
