ALTER TABLE "day" ALTER COLUMN "number" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "day" ALTER COLUMN "number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "day" ADD COLUMN "number_old" text;