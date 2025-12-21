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
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // ユーザー登録
  fastify.post("/register", async (request, reply) => {
    try {
      const body = registerSchema.parse(request.body);

      // 既存ユーザーチェック
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (existingUser) {
        return reply.status(400).send({
          success: false,
          error: { code: "USER_EXISTS", message: "このメールアドレスは既に登録されています" },
        });
      }

      // パスワードをハッシュ化
      const passwordHash = await bcrypt.hash(body.password, 10);

      // ユーザー作成
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      // JWT トークン生成
      const token = fastify.jwt.sign({ userId: user.id, email: user.email });

      return {
        success: true,
        data: {
          user,
          token,
        },
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

  // ログイン
  fastify.post("/login", async (request, reply) => {
    try {
      const body = loginSchema.parse(request.body);

      // ユーザー検索
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user) {
        return reply.status(401).send({
          success: false,
          error: { code: "INVALID_CREDENTIALS", message: "メールアドレスまたはパスワードが正しくありません" },
        });
      }

      // パスワード検証
      const isValid = await bcrypt.compare(body.password, user.passwordHash);

      if (!isValid) {
        return reply.status(401).send({
          success: false,
          error: { code: "INVALID_CREDENTIALS", message: "メールアドレスまたはパスワードが正しくありません" },
        });
      }

      // JWT トークン生成
      const token = fastify.jwt.sign({ userId: user.id, email: user.email });

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
          },
          token,
        },
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

  // 現在のユーザー取得
  fastify.get("/me", {
    onRequest: [async (request) => await request.jwtVerify()],
  }, async (request) => {
    const { userId } = request.user as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      data: user,
    };
  });
};
