import { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';

interface EditorContextType {
  runCode: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children, runCode }: { children: ReactNode; runCode: () => void }) {
  const memoizedRunCode = useCallback(runCode, [runCode]);
  
  const value = useMemo(() => ({
    runCode: memoizedRunCode
  }), [memoizedRunCode]);

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
} 