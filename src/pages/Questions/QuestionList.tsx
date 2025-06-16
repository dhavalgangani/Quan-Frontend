import { Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import './QuestionList.css';

interface Question {
    id: number;
    QuestionName: string;
    Difficulty: string;
}

const questions: Question[] = [
    { id: 1, QuestionName: 'Carbon', Difficulty: 'High' },
    { id: 2, QuestionName: 'Nitrogen', Difficulty: 'Mid' },
    { id: 3, QuestionName: 'Yttrium', Difficulty: 'Low' },
    { id: 4, QuestionName: 'Barium', Difficulty: 'High' },
    { id: 5, QuestionName: 'Cerium', Difficulty: 'Low' },
];

function QuestionList() {
    const getDifficultyClass = (difficulty: string): string => {
        switch(difficulty.toLowerCase()) {
            case 'high': return 'difficulty-high';
            case 'mid': return 'difficulty-medium';
            case 'low': return 'difficulty-low';
            default: return '';
        }
    };

    const rows = questions.map((question) => (
        <Table.Tr key={question.id}>
            <Table.Td>{question.id}</Table.Td>
            <Table.Td>{question.QuestionName}</Table.Td>
            <Table.Td className={getDifficultyClass(question.Difficulty)}>
                {question.Difficulty}
            </Table.Td>
            <Table.Td>
                <button className="action-button">
                    Open
                    <IconExternalLink />
                </button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="question-list-container">
            <Table.ScrollContainer minWidth={500}>
                <Table className="question-table">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Question Name</Table.Th>
                            <Table.Th>Difficulty</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    );
}

export default QuestionList;