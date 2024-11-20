import type { Klass, LexicalNode } from 'lexical';

import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { ListNode, ListItemNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { PageBreakNode } from './PageBreakNode';
import { HashtagNode } from '@lexical/hashtag';
import { ImageNode } from './ImageNode';
import { YouTubeNode } from './YouTubeNode';
import { KeywordNode } from './KeywordNode';

export const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  YouTubeNode,
  LinkNode,
  HorizontalRuleNode,
  PageBreakNode,
  ImageNode,
  HashtagNode,
  KeywordNode,
];
