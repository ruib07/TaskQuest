export interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  created_by: string;
}

export interface NewProject {
  name: string;
  description: string;
  deadline: string;
  created_by: string;
}

export interface ProjectDetailsProps {
  projectId: string;
  onClose: () => void;
}

export interface ProjectMember {
  project_id: string;
  user_id: string;
  role: string;
}

export interface DeleteProjectModalProps {
  projectId: string;
  onClose: () => void;
  onConfirm: () => void;
}
