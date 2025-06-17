import { Paper, Text, Badge, Divider, Box, Stack, Group } from '@mantine/core';
import { IconClock, IconDatabase, IconCode, IconBulb } from '@tabler/icons-react';

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
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack gap="xl">
        {/* Header Section */}
        <Box>
          <Group justify="space-between" align="center" mb="md">
            <Text size="xl" fw={700} style={{ flex: 1 }}>{title}</Text>
            <Badge 
              color={getDifficultyColor(difficulty)} 
              size="lg"
              variant="filled"
              radius="sm"
            >
              {difficulty}
            </Badge>
          </Group>

          <Group gap="lg">
            <Group gap="xs">
              <IconClock size={16} />
              <Text size="sm" fw={500}>Time Limit: {time_limit}ms</Text>
            </Group>
            <Group gap="xs">
              <IconDatabase size={16} />
              <Text size="sm" fw={500}>Memory Limit: {memory_limit}MB</Text>
            </Group>
          </Group>
        </Box>

        <Divider />

        {/* Description Section */}
        <Box>
          <Group gap="xs" mb="xs">
            <IconCode size={20} />
            <Text fw={600} size="lg">Description</Text>
          </Group>
          <Box className="description-content" style={{ 
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Box>
        </Box>

        {/* Input Format Section */}
        <Box>
          <Text fw={600} size="lg" mb="xs">Input Format</Text>
          <Box className="input-format" style={{ 
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            <div dangerouslySetInnerHTML={{ __html: input_description }} />
          </Box>
        </Box>

        {/* Output Format Section */}
        <Box>
          <Text fw={600} size="lg" mb="xs">Output Format</Text>
          <Box className="output-format" style={{ 
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            <div dangerouslySetInnerHTML={{ __html: output_description }} />
          </Box>
        </Box>

        {/* Examples Section */}
        <Box>
          <Text fw={600} size="lg" mb="xs">Examples</Text>
          <Stack gap="md">
            {samples.map((sample, index) => (
              <Paper 
                key={index} 
                withBorder 
                p="md" 
                radius="md"
                style={{
                  backgroundColor: '#fff',
                  borderLeft: '4px solid #228be6'
                }}
              >
                <Stack gap="xs">
                  <Box>
                    <Text fw={500} size="sm" mb="xs">Input:</Text>
                    <Box 
                      style={{ 
                        backgroundColor: '#f1f3f5',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem'
                      }}
                    >
                      {sample.input}
                    </Box>
                  </Box>
                  <Box>
                    <Text fw={500} size="sm" mb="xs">Output:</Text>
                    <Box 
                      style={{ 
                        backgroundColor: '#f1f3f5',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem'
                      }}
                    >
                      {sample.output}
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Hint Section */}
        {hint && (
          <Box>
            <Group gap="xs" mb="xs">
              <IconBulb size={20} />
              <Text fw={600} size="lg">Hint</Text>
            </Group>
            <Box className="hint-content" style={{ 
              backgroundColor: '#fff3bf',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              border: '1px solid #ffd43b'
            }}>
              <div dangerouslySetInnerHTML={{ __html: hint }} />
            </Box>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
 