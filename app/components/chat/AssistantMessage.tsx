import { memo } from 'react';
import { Markdown } from './Markdown';
import { IconButton } from '../ui/IconButton';

interface AssistantMessageProps {
  content: string;
  onDelete?: () => void;
}

export const AssistantMessage = memo(({ content, onDelete }: AssistantMessageProps) => {
  return (
    <div className="overflow-hidden w-full relative group">
      {onDelete && (
        <IconButton
          icon="i-ph:trash"
          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onDelete}
        />
      )}
      <Markdown html>{content}</Markdown>
    </div>
  );
});
