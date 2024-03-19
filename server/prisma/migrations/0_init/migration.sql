-- CreateTable
CREATE TABLE "clubRules" (
    "ruleid" SERIAL NOT NULL,
    "clubid" INTEGER NOT NULL,
    "rule" TEXT NOT NULL,

    CONSTRAINT "clubRules_pkey" PRIMARY KEY ("ruleid")
);

-- CreateTable
CREATE TABLE "clubmembers" (
    "userclubid" SERIAL NOT NULL,
    "userid" INTEGER,
    "clubid" INTEGER,

    CONSTRAINT "clubmembers_pkey" PRIMARY KEY ("userclubid")
);

-- CreateTable
CREATE TABLE "clubs" (
    "clubid" SERIAL NOT NULL,
    "clubname" VARCHAR(255) NOT NULL,
    "creationdate" TIMESTAMP(6),
    "clubdesc" TEXT,
    "clublogo" TEXT,
    "postcount" INTEGER,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("clubid")
);

-- CreateTable
CREATE TABLE "moderators" (
    "moderatorid" SERIAL NOT NULL,
    "userid" INTEGER,
    "clubid" INTEGER,

    CONSTRAINT "moderators_pkey" PRIMARY KEY ("moderatorid")
);

-- CreateTable
CREATE TABLE "posts" (
    "postid" SERIAL NOT NULL,
    "userid" INTEGER,
    "clubid" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER,
    "imagepath" VARCHAR(255),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("postid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "lastlogindate" TIMESTAMP(6),
    "registrationdate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_user_club" ON "clubmembers"("userid", "clubid");

-- AddForeignKey
ALTER TABLE "clubRules" ADD CONSTRAINT "clubRules_clubid_fkey" FOREIGN KEY ("clubid") REFERENCES "clubs"("clubid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clubmembers" ADD CONSTRAINT "clubmembers_clubid_fkey" FOREIGN KEY ("clubid") REFERENCES "clubs"("clubid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clubmembers" ADD CONSTRAINT "clubmembers_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_clubid_fkey" FOREIGN KEY ("clubid") REFERENCES "clubs"("clubid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "moderators" ADD CONSTRAINT "moderators_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_clubid_fkey" FOREIGN KEY ("clubid") REFERENCES "clubs"("clubid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

