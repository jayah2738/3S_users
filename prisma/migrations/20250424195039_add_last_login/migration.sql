-- AlterTable
ALTER TABLE "Student" ADD COLUMN "lastLogin" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "level" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Grade" ("createdAt", "description", "id", "level", "name", "updatedAt") SELECT "createdAt", "description", "id", "level", "name", "updatedAt" FROM "Grade";
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
