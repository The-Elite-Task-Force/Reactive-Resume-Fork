-- CreateEnum
CREATE TYPE "SectionFormat" AS ENUM ('Basics', 'Profiles', 'Experience', 'Education', 'Skills', 'Languages', 'Awards', 'Certifications', 'Interests', 'Projects', 'Publications', 'Volunteering', 'References', 'Custom');

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "format" "SectionFormat" NOT NULL,
    "userID" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionCVMapping" (
    "id" TEXT NOT NULL,
    "seciondID" TEXT NOT NULL,
    "resumeID" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SectionCVMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamsMapping" (
    "id" TEXT NOT NULL,
    "teamID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "resumeID" TEXT,

    CONSTRAINT "TeamsMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMapping" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "companyID" TEXT NOT NULL,
    "roleID" TEXT,

    CONSTRAINT "CompanyMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionCVMapping_seciondID_key" ON "SectionCVMapping"("seciondID");

-- CreateIndex
CREATE UNIQUE INDEX "SectionCVMapping_resumeID_key" ON "SectionCVMapping"("resumeID");

-- CreateIndex
CREATE UNIQUE INDEX "SectionCVMapping_resumeID_order_key" ON "SectionCVMapping"("resumeID", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_userID_key" ON "Team"("name", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "TeamsMapping_teamID_userID_key" ON "TeamsMapping"("teamID", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMapping_userID_companyID_key" ON "CompanyMapping"("userID", "companyID");

-- AddForeignKey
ALTER TABLE "SectionCVMapping" ADD CONSTRAINT "SectionCVMapping_seciondID_fkey" FOREIGN KEY ("seciondID") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionCVMapping" ADD CONSTRAINT "SectionCVMapping_resumeID_fkey" FOREIGN KEY ("resumeID") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMapping" ADD CONSTRAINT "TeamsMapping_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMapping" ADD CONSTRAINT "TeamsMapping_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMapping" ADD CONSTRAINT "TeamsMapping_resumeID_fkey" FOREIGN KEY ("resumeID") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMapping" ADD CONSTRAINT "CompanyMapping_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMapping" ADD CONSTRAINT "CompanyMapping_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMapping" ADD CONSTRAINT "CompanyMapping_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
