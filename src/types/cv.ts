export interface Experience {
  company: string;
  time: string;
  title: string;
  location?: string;
  description?: string;
}

export interface Education {
  institution: string;
  major: string
  time: string;
  degree: string;
  location?: string;
  description?: string;
}

export interface Skill {
  title: string;
  description: string;
}

export interface Award {
  title: string;
  time: string;
}

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  time: string;
  link?: string;
  abstract?: string;
}


export function isExperience(element: Experience | Education): element is Experience {
  return 'title' in element && 'company' in element;
}

export function isEducation(element: Education | Experience): element is Education {
  return 'institution' in element && 'degree' in element && 'major' in element;
}

export function isSkill(element: Skill | Publication): element is Skill {
  return 'description' in element;
}

export function isPublication(element: Skill | Publication): element is Publication {
  return 'authors' in element;
}

export function isAward(element: Skill | Publication): element is Publication {
  return 'title' in element;
}