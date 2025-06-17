import { Paper, Text, Badge, Divider } from '@mantine/core';

interface Sample {
  input: string;
  output: string;
}

interface QuestionDescriptionProps {
  title: string;
  description: string;
  input_description: string;
  output_description: string;
  difficulty: string;
  samples: Sample[];
  hint: string;
  time_limit: number;
  memory_limit: number;
}

export function QuestionDescription({
  title,
  description,
  input_description,
  output_description,
  difficulty,
  samples,
  hint,
  time_limit,
  memory_limit
}: QuestionDescriptionProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'low':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'high':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Text size="xl" fw={700}>{title}</Text>
        <Badge color={getDifficultyColor(difficulty)} size="lg">{difficulty}</Badge>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Badge color="blue" size="sm">Time Limit: {time_limit}ms</Badge>
        <Badge color="blue" size="sm">Memory Limit: {memory_limit}MB</Badge>
      </div>

      <Divider my="sm" />

      <div style={{ marginBottom: '1rem' }}>
        <Text fw={600} size="lg" mb="xs">Description</Text>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Text fw={600} size="lg" mb="xs">Input Format</Text>
        <div dangerouslySetInnerHTML={{ __html: input_description }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Text fw={600} size="lg" mb="xs">Output Format</Text>
        <div dangerouslySetInnerHTML={{ __html: output_description }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Text fw={600} size="lg" mb="xs">Examples</Text>
        {samples.map((sample, index) => (
          <Paper key={index} withBorder p="sm" mb="xs">
            <Text fw={500} size="sm">Input:</Text>
            <Text size="sm" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{sample.input}</Text>
            <Text fw={500} size="sm" mt="xs">Output:</Text>
            <Text size="sm" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{sample.output}</Text>
          </Paper>
        ))}
      </div>

      {hint && (
        <div>
          <Text fw={600} size="lg" mb="xs">Hint</Text>
          <div dangerouslySetInnerHTML={{ __html: hint }} />
        </div>
      )}
    </Paper>
  );
}
 