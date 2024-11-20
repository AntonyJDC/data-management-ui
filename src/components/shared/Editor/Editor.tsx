import { lexicalEditorConfig } from './config';
import { CAN_USE_DOM } from './shared/canUseDom';
import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import './Editor.css';
import Placeholder from './ui/Placeholder';
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from './context/SharedHistoryContext';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ContentEditable from './ui/ContentEditable';
// import TreeViewPlugin from './plugins/TreeViewPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import LinkPlugin from './plugins/LinkPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import PageBreakPlugin from './plugins/PageBreakPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const Editor = React.forwardRef((props: any, ref: any) => {
  if (props) {
  }
  const { historyState } = useSharedHistoryContext();
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement>();
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const text = 'Write something awesome...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const EditorCapturePlugin = React.forwardRef((props: any, ref: any) => {
    if (props) {
    }
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      ref.current = editor;
      return () => {
        ref.current = null;
      };
    }, [editor, ref]);

    return null;
  });

  return (
    <>
      <LexicalComposer initialConfig={lexicalEditorConfig}>
        <SharedHistoryContext>
          <div className='editor-shell'>
            <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
            <div className='editor-container'>
              <MaxLengthPlugin maxLength={2500} />
              <AutoFocusPlugin />
              <DragDropPaste />
              <AutoEmbedPlugin />
              <HistoryPlugin externalHistoryState={historyState} />
              <RichTextPlugin
                contentEditable={      
                  <div className='editor-scroller'>
                    <div className='editor' ref={onRef}>
                      <ContentEditable />
                    </div>
                  </div>
                }
                placeholder={placeholder}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <EditorCapturePlugin ref={ref} />
              <MarkdownShortcutPlugin />
              <CodeHighlightPlugin />
              <ListPlugin />
              <CheckListPlugin />
              <ImagesPlugin />
              <KeywordsPlugin />
              <LinkPlugin />
              <YouTubePlugin />
              <HorizontalRulePlugin />
              <PageBreakPlugin />
              {floatingAnchorElem && !isSmallWidthViewport && (
                <>
                  <DraggableBlockPlugin anchorElem={floatingAnchorElem} />

                  <FloatingLinkEditorPlugin
                    anchorElem={floatingAnchorElem}
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                  />
                </>
              )}
            </div>
            {/* {<TreeViewPlugin />} */}
          </div>
        </SharedHistoryContext>
      </LexicalComposer>
    </>
  );
});
