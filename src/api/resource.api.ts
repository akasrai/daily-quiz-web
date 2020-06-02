import * as http from './http.api';
import { Token } from './token.api';
import { Credentials } from 'auth/auth.type';
import { QuizPayload, SeasonPayload } from 'daily-quiz/daily-quiz.type';

export const refreshAccessToken = () => {
  return http.post(`/auth/token`, {
    referenceToken: Token.getAccessToken(),
  });
};

export const signIn = (credentials: Credentials) => {
  return http.post(`/auth/signin`, credentials);
};

export const getCurrentUser = () => {
  return http.get(`/auth/users`);
};

export const signOut = () => {
  return http.get(`/auth/signout`);
};

export const createQuiz = (quizPayload: QuizPayload) => {
  return http.post(`/quiz`, quizPayload);
};

export const getCurrentSeason = () => {
  return http.get(`/quiz/current/season`);
};

export const getTop10SeasonStats = () => {
  return http.get(`quiz/seasons/stats`);
};

export const hostNewSeason = (season: SeasonPayload) => {
  return http.post(`/quiz/host/season`, season);
};

export const endSeason = () => {
  return http.get(`/quiz/end/season`);
};
