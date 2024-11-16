export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  task_list_id: string;
  assigned_to: string;
}

export interface NewTask {
  title: string;
  description: string;
  status: string;
  due_date: string;
  task_list_id: string;
  assigned_to: string;
}

export interface TaskList {
  id: string;
  name: string;
  project_id: string;
}

export interface NewTaskList {
  name: string;
  project_id: string;
}

export interface TaskComment {
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
}
