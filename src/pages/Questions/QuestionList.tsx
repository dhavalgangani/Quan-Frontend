// import { Table } from '@mantine/core';
// import { IconExternalLink } from '@tabler/icons-react';
// import './QuestionList.css';

// interface Question {
//     id: number;
//     QuestionName: string;
//     Difficulty: string;
// }

// const questions: Question[] = [
//     { id: 1, QuestionName: 'Carbon', Difficulty: 'High' },
//     { id: 2, QuestionName: 'Nitrogen', Difficulty: 'Mid' },
//     { id: 3, QuestionName: 'Yttrium', Difficulty: 'Low' },
//     { id: 4, QuestionName: 'Barium', Difficulty: 'High' },
//     { id: 5, QuestionName: 'Cerium', Difficulty: 'Low' },
// ];

// function QuestionList() {
//     const getDifficultyClass = (difficulty: string): string => {
//         switch(difficulty.toLowerCase()) {
//             case 'high': return 'difficulty-high';
//             case 'mid': return 'difficulty-medium';
//             case 'low': return 'difficulty-low';
//             default: return '';
//         }
//     };

//     const rows = questions.map((question) => (
//         <Table.Tr key={question.id}>
//             <Table.Td>{question.id}</Table.Td>
//             <Table.Td>{question.QuestionName}</Table.Td>
//             <Table.Td className={getDifficultyClass(question.Difficulty)}>
//                 {question.Difficulty}
//             </Table.Td>
//             <Table.Td>
//                 <button className="action-button">
//                     Open
//                     <IconExternalLink />
//                 </button>
//             </Table.Td>
//         </Table.Tr>
//     ));

//     return (
//         <div className="question-list-container">
//             <Table.ScrollContainer minWidth={500}>
//                 <Table className="question-table">
//                     <Table.Thead>
//                         <Table.Tr>
//                             <Table.Th>ID</Table.Th>
//                             <Table.Th>Question Name</Table.Th>
//                             <Table.Th>Difficulty</Table.Th>
//                             <Table.Th>Action</Table.Th>
//                         </Table.Tr>
//                     </Table.Thead>
//                     <Table.Tbody>{rows}</Table.Tbody>
//                 </Table>
//             </Table.ScrollContainer>
//         </div>
//     );
// }

// export default QuestionList;





// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchQuestions } from '../../Redux/slices/questionSlice';
// import { Table, Button, Group, Text, Loader, Center, Pagination } from '@mantine/core';
// import { IconEdit, IconTrash } from '@tabler/icons-react';
// import { RootState } from '../../Redux/Store/store';

// interface Question {
//     _id: string;
//     question: string;
//     options: string[];
//     correctAnswer: string;
//     category: string;
//     difficulty: string;
//     points: number;
// }

// const QuestionList: React.FC = () => {
//     const dispatch = useDispatch();
//     const { questions, loading, error, currentPage, totalPages, totalQuestions } = useSelector((state: RootState) => state.questions);
// console.log("Questionsssss",questions);

//     useEffect(() => {
//         dispatch(fetchQuestions());
//         console.log('Fetching questions...');
//     }, [dispatch]);

//     useEffect(() => {
//         console.log('Questions state:', questions);
//         console.log('Loading state:', loading);
//         console.log('Error state:', error);
//         console.log('Pagination state:', { currentPage, totalPages, totalQuestions });
//     }, [questions, loading, error, currentPage, totalPages, totalQuestions]);

//     if (loading) {
//         return (
//             <Center>
//                 <Loader size="lg" />
//             </Center>
//         );
//     }

//     if (error) {
//         return (
//             <Text color="red">
//                 {error}
//             </Text>
//         );
//     }

//     if (!Array.isArray(questions)) {
//         console.error('Questions is not an array:', questions);
//         return (
//             <Text color="red">
//                 Questions data is not in the expected format
//             </Text>
//         );
//     }

//     return (
//         <div>
//             <Text size="sm" mb="md">
//                 Showing {questions.length} of {totalQuestions} questions (Page {currentPage} of {totalPages})
//             </Text>
//             <Table striped highlightOnHover>
//                 <Table.Thead>
//                     <Table.Tr>
//                         <Table.Th>Question</Table.Th>
//                         <Table.Th>Options</Table.Th>
//                         <Table.Th>Correct Answer</Table.Th>
//                         <Table.Th>Actions</Table.Th>
//                     </Table.Tr>
//                 </Table.Thead>
//                 <Table.Tbody>
//                     {questions.map((question: Question) => (
//                         <Table.Tr key={question._id}>
//                             <Table.Td>{question.question || 'No question text'}</Table.Td>
//                             <Table.Td>
//                                 {Array.isArray(question.options) ? (
//                                     question.options.map((option: string, index: number) => (
//                                         <div key={index}>{option}</div>
//                                     ))
//                                 ) : (
//                                     <Text color="red" size="sm">No options available</Text>
//                                 )}
//                             </Table.Td>
//                             <Table.Td>{question.correctAnswer || 'No correct answer'}</Table.Td>
//                             <Table.Td>
//                                 <Group>
//                                     <Button
//                                         variant="light"
//                                         color="blue"
//                                         size="xs"
//                                         leftSection={<IconEdit size={14} />}
//                                     >
//                                         Edit
//                                     </Button>
//                                     <Button
//                                         variant="light"
//                                         color="red"
//                                         size="xs"
//                                         leftSection={<IconTrash size={14} />}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </Group>
//                             </Table.Td>
//                         </Table.Tr>
//                     ))}
//                 </Table.Tbody>
//             </Table>
//             <Center mt="xl">
//                 <Pagination
//                     total={totalPages}
//                     value={currentPage}
//                     onChange={(page) => {
//                         // TODO: Implement page change
//                         console.log('Page changed to:', page);
//                     }}
//                 />
//             </Center>
//         </div>
//     );
// };

// export default QuestionList;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../Redux/slices/questionSlice';
import './QuestionList.css';
import {
  Table,
  Button,
  Group,
  Text,
  Loader,
  Center,
  Pagination,
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { RootState } from '../../Redux/Store/store';
import { useNavigate } from 'react-router-dom';

// interface Question {
//   _id: string;
//   title: string;
//   options: string[];
//   correctAnswer: string;
//   category: string;
//   difficulty: string;
// }
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
const QuestionList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    questions,
    loading,
    error,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.questions);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchQuestions({ page: currentPage }) as any);
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    console.log(page);

    dispatch(fetchQuestions({ page }) as any);
  };

  const getDifficultyClass = (difficulty: string): string => {
    console.log("Difficulty received:", difficulty);
    switch (difficulty?.toLowerCase()) {
      case 'high': return 'difficulty-high';
      case 'medium':
      case 'mid': return 'difficulty-medium';
      case 'low': return 'difficulty-low';
      default: return '';
    }
  };

  if (loading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text color="red">{error}</Text>
      </Center>
    );
  }

  if (!Array.isArray(questions)) {
    return (
      <Text color="red">Questions data is not in the expected format</Text>
    );
  }

  return (
    <div className="question-list-container">
      <Text className="question-list-header" mb="md">
        Questions List
      </Text>
      {/* <Text size="sm" mb="md">
        Showing {questions.length} of {totalQuestions} questions (Page {currentPage} of {totalPages})
      </Text> */}

      <Table.ScrollContainer minWidth={500}>
        <Table className="question-table" striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Question</Table.Th>
              <Table.Th>Difficulty</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {questions.map((question: Question) => (
              <Table.Tr key={question._id}>
                <Table.Td>{question.title || 'No question text'}</Table.Td>
                <Table.Td>
                  <Text span className={getDifficultyClass(question.difficulty)}>
                    {question.difficulty}
                  </Text>
                </Table.Td>
                <Table.Td className="text-center">
                  <Group justify="center">
                    <Button
                      variant="light"
                      color="blue"
                      size="xs"
                      leftSection={<IconExternalLink size={14} />}
                      onClick={()=>{navigate(`/question/${question._id}`)}}
                    >
                      Open
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Center className="pagination-container">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          size="lg"
          radius="lg"
          siblings={1}
          boundaries={1}
        />

      </Center>
    </div>
  );
};

export default QuestionList;
