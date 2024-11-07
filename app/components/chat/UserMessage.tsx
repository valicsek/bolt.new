import { modificationsRegex } from '~/utils/diff';
import { Markdown } from './Markdown';
import { IconButton } from '../ui/IconButton';

interface UserMessageProps {
  content: string;
  onDelete?: () => void;
}

export function UserMessage({ content, onDelete }: UserMessageProps) {
  return (
    <div className="overflow-hidden pt-[4px] relative group">
      {onDelete && (
        <IconButton
          icon="i-ph:trash"
          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onDelete}
        />
      )}
      <Markdown limitedMarkdown>{sanitizeUserMessage(content)}</Markdown>
    </div>
  );
}

function sanitizeUserMessage(content: string) {
  return content.replace(modificationsRegex, '').trim();
}
