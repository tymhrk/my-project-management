export interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
}
export interface Task {
  id: string;
  project_id: string;
  title: string;
  content?: string;
  status: "todo" | "doing" | "done";
  created_at: string;
}
