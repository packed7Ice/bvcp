// Copyright 2025 Yorikawa Aise
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { authRoutes } from "./routes/auth.js";
import { repositoryRoutes } from "./routes/repositories.js";
import { healthRoutes } from "./routes/health.js";

const fastify = Fastify({
  logger: true,
});

// プラグイン登録
await fastify.register(cors, {
  origin: true,
});

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "bvcp-dev-secret-change-in-production",
});

// ルート登録
await fastify.register(healthRoutes);
await fastify.register(authRoutes, { prefix: "/api/auth" });
await fastify.register(repositoryRoutes, { prefix: "/api/repositories" });

// サーバー起動
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3001", 10);
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 BVCP API Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
