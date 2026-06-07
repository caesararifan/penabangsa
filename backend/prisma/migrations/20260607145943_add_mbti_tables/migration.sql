-- CreateTable
CREATE TABLE "MbtiProfile" (
    "type" VARCHAR(4) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "professions" TEXT NOT NULL,

    CONSTRAINT "MbtiProfile_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "MbtiResult" (
    "id" SERIAL NOT NULL,
    "mbtiType" VARCHAR(4) NOT NULL,
    "rawAnswers" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MbtiResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MbtiResult" ADD CONSTRAINT "MbtiResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MbtiResult" ADD CONSTRAINT "MbtiResult_mbtiType_fkey" FOREIGN KEY ("mbtiType") REFERENCES "MbtiProfile"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
