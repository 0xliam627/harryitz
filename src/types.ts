export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  fullStory?: string;
  downloadsCount: string;
  downloadUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  status: string;
  features: string[];
  featured?: boolean;
}

export interface ArticleItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  dek: string;
  content: string[];
  quote?: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools';
  icon?: string;
}
