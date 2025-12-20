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

/**
 * BVCP 共通型定義
 */

/** オブジェクト ID (BLAKE3 ハッシュ) */
export type ObjectId = string;

/** ストレージの種類 */
export type StorageType = "managed" | "external";

/** ファイルバージョン */
export interface FileVersion {
  id: string;
  path: string;
  objectId: ObjectId;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

/** オブジェクト（バイナリ実体） */
export interface BinaryObject {
  id: ObjectId;
  storageType: StorageType;
  storageUri: string;
  size: number;
  createdAt: Date;
}

/** リポジトリ */
export interface Repository {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

/** ユーザー */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
}

/** API レスポンス（成功） */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/** API レスポンス（エラー） */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/** API レスポンス */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
