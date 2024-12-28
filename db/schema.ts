import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
};

// User Schema
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  currentLocation: text("current_location"),
  permanentLocation: text("permanent_location"),
  personalNo: text("personal_no"),
  guardiansNo: text("guardians_no"),
  password: text("password"),
  ...timestamps,
});

// QR Code Schema
export const qr = pgTable("qrs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  qr: text("qr_url").notNull(),
  userId: text("user_id").references(() => users.id),
  ...timestamps,
});
