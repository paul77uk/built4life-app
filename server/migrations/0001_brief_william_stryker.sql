CREATE TABLE IF NOT EXISTS "exerciseHistory" (
	"id" text PRIMARY KEY NOT NULL,
	"exerciseName" text,
	"workoutHistoryId" text NOT NULL,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "setHistory" (
	"id" text PRIMARY KEY NOT NULL,
	"setNumber" text,
	"weight" text,
	"reps" text,
	"exerciseHistoryId" text NOT NULL,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutHistory" (
	"id" text PRIMARY KEY NOT NULL,
	"workoutName" text,
	"userId" text NOT NULL,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseHistory" ADD CONSTRAINT "exerciseHistory_workoutHistoryId_workoutHistory_id_fk" FOREIGN KEY ("workoutHistoryId") REFERENCES "workoutHistory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "setHistory" ADD CONSTRAINT "setHistory_exerciseHistoryId_exerciseHistory_id_fk" FOREIGN KEY ("exerciseHistoryId") REFERENCES "exerciseHistory"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutHistory" ADD CONSTRAINT "workoutHistory_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
