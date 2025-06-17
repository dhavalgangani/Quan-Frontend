import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CreatedBy {
  id: number;
  username: string;
  real_name: string | null;
}

interface Template {
  JavaScript: string;
}

interface LanguageBoilerPlate {
  C: string;
  Cpp: string;
  Java: string;
  Python2: string;
  Python3: string;
  JavaScript: string;
}

interface Sample {
  input: string;
  output: string;
}

interface Question {
  id: number;
  created_by: CreatedBy;
  template: Template;
  editorial: string | null;
  bookmarked: boolean;
  language_boiler_plate: LanguageBoilerPlate;
  _id: string;
  title: string;
  description: string;
  input_description: string;
  output_description: string;
  samples: Sample[];
  hint: string;
  languages: string[];
  create_time: string;
  last_update_time: string | null;
  time_limit: number;
  memory_limit: number;
  difficulty: string;
  total_score: number;
  submission_number: number;
  accepted_number: number;
}

interface QuestionResponse {
  questions: Question[];
  currentPage: number;
  totalPages: number;
  totalQuestions: number;
}

interface QuestionState {
  questions: Question[];
  currentQuestion: Question | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalQuestions: number;
}

const initialState: QuestionState = {
  questions: [],
  currentQuestion: null,
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
    
    const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/questions/getallquestion?page=${page}`);
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

export const fetchQuestionById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    console.log('Fetching question with ID:', id);
    
    const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/questions/getquestion/${id}`);
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data) {
      throw new Error('Invalid response format: question data is missing');
    }
    
    dispatch(setCurrentQuestion(data.question));
  } catch (error) {
    console.error('Error fetching question:', error);
    dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch question'));
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
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.currentQuestion = null;
    },
    setQuestions: (state, action: PayloadAction<QuestionResponse>) => {
      state.questions = action.payload.questions;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalQuestions = action.payload.totalQuestions;
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setQuestions, setCurrentQuestion } = questionSlice.actions;
export default questionSlice.reducer;
