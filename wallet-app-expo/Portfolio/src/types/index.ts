export interface Project {
  id: string;
  title: string;
  category: 'Web Apps' | 'Mobile Apps' | 'Dashboards' | 'APIs' | 'Enterprise Systems' | 'AI Projects';
  description: string;
  liveUrl: string;
  githubUrl: string;
  caseStudy: string;
  techStack: string[];
  features: string[];
  performanceScore: number;
  image: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  slug: string;
}