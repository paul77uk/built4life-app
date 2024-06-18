ALTER TABLE "set" ALTER COLUMN "setNumber" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "set" ALTER COLUMN "setNumber" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "set" ALTER COLUMN "weight" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "set" ALTER COLUMN "weight" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "set" ALTER COLUMN "reps" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "set" ALTER COLUMN "reps" DROP NOT NULL;