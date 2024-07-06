ALTER TABLE "day" ALTER COLUMN "number" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "day" ALTER COLUMN "number" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "number_new" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "day" DROP COLUMN IF EXISTS "number_old";