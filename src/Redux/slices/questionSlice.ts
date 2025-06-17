import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../Store/store';

interface Question {
  _id: string;
  title: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: string;
}

interface QuestionResponse {
  questions: Question[];
  currentPage: number;
  totalPages: number;
  totalQuestions: number;
}

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalQuestions: number;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalQuestions: 0,
};

interface FetchQuestionsParams {
  page: number;
}

export const fetchQuestions = ({ page }: FetchQuestionsParams) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    console.log('Fetching questions for page:', page);
    
    const response = await fetch(`http://localhost:3000/api/questions/getallquestion?page=${page}`);
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data || !Array.isArray(data.questions)) {
      throw new Error('Invalid response format: questions array is missing');
    }
    
    dispatch(setQuestions(data));
  } catch (error) {
    console.error('Error fetching questions:', error);
    dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch questions'));
  } finally {
    dispatch(setLoading(false));
  }
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setQuestions: (state, action: PayloadAction<QuestionResponse>) => {
      state.questions = action.payload.questions;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalQuestions = action.payload.totalQuestions;
    },
  },
});

export const { setLoading, setError, setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
