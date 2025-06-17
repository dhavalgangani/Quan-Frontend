import { Card, Group, Select, Paper, Text } from '@mantine/core';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useRef, useState, MutableRefObject, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/store';

interface CodeEditorProps {
  onRunRef: MutableRefObject<(() => void) | null>;
  initialCode?: string;
}

export function CodeEditor({ onRunRef, initialCode = '// Write your code here...\n// Example: console.log("Hello, World!");' }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [output, setOutput] = useState<string>('');
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; actual: string }[]>([]);
  const originalConsoleLogRef = useRef<typeof console.log>(console.log);
  const { currentQuestion } = useSelector((state: RootState) => state.questions);

  const runTests = useCallback((code: string) => {
    if (!currentQuestion?.samples) return;

    const results = currentQuestion.samples.map(sample => {
      // Override console.log to capture output
      let actualOutput = '';
      console.log = (...args) => {
        actualOutput += args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
      };

      try {
        // Extract function name from the code
        const functionMatch = code.match(/function\s+(\w+)/);
        if (!functionMatch) {
          throw new Error('No function found in the code');
        }
        const functionName = functionMatch[1];

        // Create a safe execution environment
        const safeEval = new Function('console', `
          try {
            ${code}
            // Execute the function with sample input
            const input = "${sample.input}";
            const result = ${functionName}(${sample.input.split(' ').join(', ')});
            console.log(result);
          } catch (e) {
            console.log("Error:", e.message);
          }
        `);
        
        safeEval(console);
        const passed = actualOutput.trim() === sample.output.trim();
        return { passed, input: sample.input, expected: sample.output, actual: actualOutput.trim() };
      } catch (error) {
        return { 
          passed: false, 
          input: sample.input, 
          expected: sample.output, 
          actual: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      } finally {
        // Restore original console.log
        console.log = originalConsoleLogRef.current;
      }
    });

    setTestResults(results);
  }, [currentQuestion?.samples]);

  const handleRun = useCallback(() => {
    if (!editorView) return;
    
    const code = editorView.state.doc.toString();
    let outputText = '';
    
    // Override console.log to capture output
    console.log = (...args) => {
      outputText += args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ') + '\n';
    };

    try {
      // Create a safe execution environment with console.log available
      const safeEval = new Function('console', `
        try {
          ${code}
        } catch (e) {
          console.log("Error:", e.message);
        }
      `);
      
      safeEval(console);
      setOutput(outputText || 'Code executed successfully');
      runTests(code);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setOutput(`Error: ${errorMessage}`);
    } finally {
      // Restore original console.log
      console.log = originalConsoleLogRef.current;
    }
  }, [editorView, runTests]);

  useEffect(() => {
    onRunRef.current = handleRun;
  }, [onRunRef, handleRun]);

  useEffect(() => {
    if (editorRef.current) {
      const view = new EditorView({
        doc: initialCode,
        extensions: [
          basicSetup,
          javascript(),
          EditorView.theme({
            '&': { height: '400px' },
            '.cm-scroller': { overflow: 'auto' },
            '.cm-content': { fontFamily: 'monospace', fontSize: '14px' }
          })
        ],
        parent: editorRef.current
      });

      setEditorView(view);

      return () => {
        view.destroy();
      };
    }
  }, [initialCode]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 400 }}>
      <Group justify="space-between" mb="sm">
        <Select
          data={['JavaScript', 'Python', 'C++']}
          defaultValue="JavaScript"
          style={{ width: 150 }}
        />
      </Group>
      <div ref={editorRef} style={{ border: '1px solid #eee', borderRadius: '4px' }} />
      
      {output && (
        <Paper withBorder p="sm" mt="md">
          <Text fw={600}>Output</Text>
          <Text size="sm" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{output}</Text>
        </Paper>
      )}

      {testResults.length > 0 && (
        <Paper withBorder p="sm" mt="md">
          <Text fw={600}>Test Results</Text>
          {testResults.map((result, index) => (
            <Paper key={index} withBorder p="xs" mt="xs" style={{ 
              borderLeft: `4px solid ${result.passed ? '#40c057' : '#fa5252'}` 
            }}>
              <Text size="sm" fw={500}>Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}</Text>
              <Text size="sm">Input: {result.input}</Text>
              <Text size="sm">Expected: {result.expected}</Text>
              <Text size="sm">Actual: {result.actual}</Text>
            </Paper>
          ))}
        </Paper>
      )}
    </Card>
  );
}
