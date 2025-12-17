
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface QuoteRequest {
  name: string;
  email: string;
  company: string;
  idea: string;
  budgetRange: string;
}

export interface AIAnalysis {
  refinedBrief: string;
  suggestedStack: string[];
  estimatedTimeline: string;
}
