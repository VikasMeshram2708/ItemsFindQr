"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var dotenv_1 = require("dotenv");
var node_postgres_1 = require("drizzle-orm/node-postgres");
var pg_1 = require("pg");
(0, dotenv_1.config)({ path: ".env.local" });
var schema = require("./schema");
console.log("env-2", process.env.NEXT_PUBLIC_DATABASE_URL);
var pool = new pg_1.Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
});
exports.db = (0, node_postgres_1.drizzle)({ client: pool, schema: schema });
