import { exercises } from "./../server/schema";
import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import * as schema from "@/server/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

export type Workouts = InferResultType<
  "workouts",
  { weeks: true; days: true; exercises: true; sets: true }
>;

export type Weeks = InferResultType<
  "weeks",
  { days: true; exercises: true; sets: true }
>;

export type Days = InferResultType<"days", { exercises: true; sets: true }>;

export type Exercises = InferResultType<"exercises", { sets: true }>;

export type Sets = InferResultType<"sets">;
