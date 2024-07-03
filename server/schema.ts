import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "next-auth/adapters";

// defaultFn: () => crypto.randomUUID() is a function that generates a random UUID for the id column
// uuid's are used to uniquely identify a user, this is a common practice in databases, the id's are longer and harder to guess than a simple number, they use a combination of numbers and letters.
// serial would be a simple number that increments by 1 each time a new user is created, but we want more security so we use a UUID
// a primary key is a unique identifier for a row in a table, it is used to uniquely identify, it differs from a normal id in that it is unique and cannot be duplicated

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verficationToken) => ({
    compositePk: primaryKey({
      columns: [verficationToken.identifier, verficationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const workouts = pgTable("workout", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  title: text("title").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const workoutsRelations = relations(workouts, ({ many }) => ({
  weeks: many(weeks),
}));

// have to remember serial id is serial while uuid is a string
// but I changed serials to uuids as was causing some errors with drizzle
export const weeks = pgTable("week", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  number: text("number"),
  workoutId: text("workoutId")
    .notNull()
    .references(() => workouts.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const weeksRelations = relations(weeks, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [weeks.workoutId],
    references: [workouts.id],
  }),
  days: many(days),
}));

export const days = pgTable("day", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  number: text("number"),
  weekId: text("weekId")
    .notNull()
    .references(() => weeks.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const daysRelations = relations(days, ({ one, many }) => ({
  week: one(weeks, {
    fields: [days.weekId],
    references: [weeks.id],
  }),
  exercises: many(exercises),
}));

export const exercises = pgTable("exercise", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  name: text("name"),
  dayId: text("dayId")
    .notNull()
    .references(() => days.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  day: one(days, {
    fields: [exercises.dayId],
    references: [days.id],
  }),
  sets: many(sets),
}));

export const sets = pgTable("set", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  exerciseId: text("exerciseId")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  setNumber: text("setNumber"),
  weight: text("weight"),
  reps: text("reps"),
  created: timestamp("created").defaultNow(),
});

export const setsRelations = relations(sets, ({ one }) => ({
  exercise: one(exercises, {
    fields: [sets.exerciseId],
    references: [exercises.id],
  }),
}));

export const workoutHistory = pgTable("workoutHistory", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  workoutName: text("workoutName"),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const workoutHistoryRelations = relations(
  workoutHistory,
  ({ many }) => ({
    exerciseHistory: many(exerciseHistory),
  })
);

export const exerciseHistory = pgTable("exerciseHistory", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  exerciseName: text("exerciseName"),
  workoutHistoryId: text("workoutHistoryId")
    .notNull()
    .references(() => workoutHistory.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const exerciseHistoryRelations = relations(
  exerciseHistory,
  ({ one, many }) => ({
    workoutHistory: one(workoutHistory, {
      fields: [exerciseHistory.workoutHistoryId],
      references: [workoutHistory.id],
    }),
    setHistory: many(setHistory),
  })
);

export const setHistory = pgTable("setHistory", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  setNumber: text("setNumber"),
  weight: text("weight"),
  reps: text("reps"),
  exerciseHistoryId: text("exerciseHistoryId")
    .notNull()
    .references(() => exerciseHistory.id, { onDelete: "cascade" }),
  created: timestamp("created").defaultNow(),
});

export const setHistoryRelations = relations(setHistory, ({ one }) => ({
  exerciseHistory: one(exerciseHistory, {
    fields: [setHistory.exerciseHistoryId],
    references: [exerciseHistory.id],
  }),
}));
