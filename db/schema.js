"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qr = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var timestamps = {
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }),
};
// User Schema
exports.users = (0, pg_core_1.pgTable)("users", __assign({ id: (0, pg_core_1.text)("id").primaryKey().$defaultFn(function () { return crypto.randomUUID(); }), name: (0, pg_core_1.text)("name").notNull(), email: (0, pg_core_1.text)("email").notNull().unique(), password: (0, pg_core_1.text)("password") }, timestamps));
// QR Code Schema
exports.qr = (0, pg_core_1.pgTable)("qrs", __assign({ id: (0, pg_core_1.text)("id").primaryKey().$defaultFn(function () { return crypto.randomUUID(); }), qr: (0, pg_core_1.text)("qr_url").notNull(), userId: (0, pg_core_1.text)("user_id").references(function () { return exports.users.id; }) }, timestamps));
