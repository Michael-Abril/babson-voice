export type IdeaCategory = 'academics' | 'campus-life' | 'dining' | 'facilities' | 'clubs' | 'other';

export interface Idea {
  id: string;
  title: string;
  body: string;
  category: IdeaCategory;
  upvotes: number;
  downvotes: number;
  volunteerCount: number;
  createdAt: string;
}

export interface Vote {
  id: string;
  ideaId: string;
  voterId: string;
  voteType: 'up' | 'down';
  createdAt: string;
}

export interface Volunteer {
  id: string;
  ideaId: string;
  userId: string;
  email: string;
  signedUpAt: string;
}
