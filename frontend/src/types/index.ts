export interface Project {
  id: string;
  name: string;
  description?: string;
  tasks_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: "todo" | "doing" | "done";
  project_id: string;
  created_at: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: "todo" | "doing" | "done";
  project_id: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
}
