export interface OptionPayload {
  id?: number;
  answer: string;
  correct?: boolean;
}

export interface QuestionPayload {
  id?: string;
  point: number;
  category: string;
  question: string;
}

export interface QuizPayload {
  question: QuestionPayload;
  answers: OptionPayload[];
}

export interface QuizSeason {
  title: string;
  active: boolean;
  duration: number;
  updatedAt: string;
  createdAt: string;
  description: string;
}

export interface Winner {
  point: number;
  gamePlayed: number;
  player: {
    name: string;
    photo: string;
  };
}

export interface Top10SeasonStats {
  title: string;
  endsAt: string;
  season: number;
  active: boolean;
  duration: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  winners: Winner[];
}
