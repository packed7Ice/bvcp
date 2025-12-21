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

import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const createRepositorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

const updateRepositorySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

export const repositoryRoutes: FastifyPluginAsync = async (fastify) => {
  // 認証ミドルウェア
  fastify.addHook("onRequest", async (request) => {
    await request.jwtVerify();
  });

  // リポジトリ一覧取得
  fastify.get("/", async (request) => {
    const { userId } = request.user as { userId: string };

    const repositories = await prisma.repository.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: repositories,
    };
  });

  // リポジトリ作成
  fastify.post("/", async (request, reply) => {
    try {
      const { userId } = request.user as { userId: string };
      const body = createRepositorySchema.parse(request.body);

      const repository = await prisma.repository.create({
        data: {
          name: body.name,
          description: body.description,
          ownerId: userId,
        },
      });

      return reply.status(201).send({
        success: true,
        data: repository,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          success: false,
          error: { code: "VALIDATION_ERROR", message: error.errors[0].message },
        });
      }
      throw error;
    }
  });

  // リポジトリ詳細取得
  fastify.get("/:id", async (request, reply) => {
    const { userId } = request.user as { userId: string };
    const { id } = request.params as { id: string };

    const repository = await prisma.repository.findFirst({
      where: { id, ownerId: userId },
      include: {
        fileVersions: {
          orderBy: { createdAt: "desc" },
          take: 100,
        },
      },
    });

    if (!repository) {
      return reply.status(404).send({
        success: false,
        error: { code: "NOT_FOUND", message: "リポジトリが見つかりません" },
      });
    }

    return {
      success: true,
      data: repository,
    };
  });

  // リポジトリ更新
  fastify.patch("/:id", async (request, reply) => {
    try {
      const { userId } = request.user as { userId: string };
      const { id } = request.params as { id: string };
      const body = updateRepositorySchema.parse(request.body);

      const repository = await prisma.repository.findFirst({
        where: { id, ownerId: userId },
      });

      if (!repository) {
        return reply.status(404).send({
          success: false,
          error: { code: "NOT_FOUND", message: "リポジトリが見つかりません" },
        });
      }

      const updated = await prisma.repository.update({
        where: { id },
        data: body,
      });

      return {
        success: true,
        data: updated,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          success: false,
          error: { code: "VALIDATION_ERROR", message: error.errors[0].message },
        });
      }
      throw error;
    }
  });

  // リポジトリ削除
  fastify.delete("/:id", async (request, reply) => {
    const { userId } = request.user as { userId: string };
    const { id } = request.params as { id: string };

    const repository = await prisma.repository.findFirst({
      where: { id, ownerId: userId },
    });

    if (!repository) {
      return reply.status(404).send({
        success: false,
        error: { code: "NOT_FOUND", message: "リポジトリが見つかりません" },
      });
    }

    await prisma.repository.delete({
      where: { id },
    });

    return {
      success: true,
      data: { message: "リポジトリを削除しました" },
    };
  });
};
