import { PlaygroundNodes } from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

export const lexicalEditorConfig = {
  namespace: 'MyEditor',
  onError,
  nodes: [...PlaygroundNodes],
  theme: PlaygroundEditorTheme,
};
