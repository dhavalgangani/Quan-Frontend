import { Header } from '../Header/Header'
import { Grid, Container, Loader, Center, Text } from '@mantine/core';
import { QuestionDescription } from '../Description/Description';
import { CodeEditor } from '../Editor/Editor';
import { EditorProvider } from '../../context/EditorContext';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById } from '../../Redux/slices/questionSlice';
import { useParams } from 'react-router-dom';
import { RootState } from '../../Redux/Store/store';
import './question.css'

export function Question() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentQuestion, loading, error } = useSelector((state: RootState) => state.questions);
    const runCodeRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchQuestionById(id) as any);
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center style={{ height: '100vh' }}>
                <Text c="red" size="xl">Error: {error}</Text>
            </Center>
        );
    }

    if (!currentQuestion) {
        return (
            <Center style={{ height: '100vh' }}>
                <Text size="xl">Question not found</Text>
            </Center>
        );
    }

    return (
        <EditorProvider runCode={() => runCodeRef.current?.()}>
            <Header />
            <Container size="xl" py="xl">
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <QuestionDescription 
                            title={currentQuestion.title}
                            description={currentQuestion.description}
                            input_description={currentQuestion.input_description}
                            output_description={currentQuestion.output_description}
                            difficulty={currentQuestion.difficulty}
                            samples={currentQuestion.samples}
                            hint={currentQuestion.hint}
                            time_limit={currentQuestion.time_limit}
                            memory_limit={currentQuestion.memory_limit}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <CodeEditor 
                            onRunRef={runCodeRef}
                            initialCode={currentQuestion.template?.JavaScript || ''}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </EditorProvider>
    )
}

export default Question