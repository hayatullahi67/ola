/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageBase64: string;
  link: string;
  createdAt: number;
}

export type NewProject = Omit<Project, "id" | "createdAt"> & { createdAt?: number };

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: number;
}

export type NewMessage = Omit<Message, "id" | "createdAt"> & { createdAt?: number };
