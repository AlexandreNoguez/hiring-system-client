export interface AuthModel {
  userLogin: string;
  userPassword: string;
}

export interface SignUpModel {
  userLogin: string;
  userName: string;
  userPassword: string;
  matchUserPassword: string;
  userEmail: string;
  skills: SkillModel[]
}

interface SkillModel {
  skillId: number;
  experience: string;
  lastUsed: string;
}
