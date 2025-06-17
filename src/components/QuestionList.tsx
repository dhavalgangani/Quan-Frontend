import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/slices/questionSlice';
import { Table, Button, Group, Text, Loader, Center } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { RootState } from '../Redux/Store/store';

interface Question {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    category: string;
    difficulty: string;
    points: number;
}

const QuestionList: React.FC = () => {
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state: RootState) => state.questions);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    if (loading) {
        return (
            <Center>
                <Loader size="lg" />
            </Center>
        );
    }

    if (error) {
        return (
            <Text color="red" align="center">
                {error}
            </Text>
        );
    }

    return (
        <div>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Question</Table.Th>
                        <Table.Th>Options</Table.Th>
                        <Table.Th>Correct Answer</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {questions.map((question: Question) => (
                        <Table.Tr key={question._id}>
                            <Table.Td>{question.question}</Table.Td>
                            <Table.Td>
                                {question.options.map((option: string, index: number) => (
                                    <div key={index}>{option}</div>
                                ))}
                            </Table.Td>
                            <Table.Td>{question.correctAnswer}</Table.Td>
                            <Table.Td>
                                <Group>
                                    <Button
                                        variant="light"
                                        color="blue"
                                        size="xs"
                                        leftSection={<IconEdit size={14} />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="light"
                                        color="red"
                                        size="xs"
                                        leftSection={<IconTrash size={14} />}
                                    >
                                        Delete
                                    </Button>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default QuestionList; 