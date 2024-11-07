import type { Message } from 'ai';
import React, { type RefCallback } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { Menu } from '~/components/sidebar/Menu.client';
import { IconButton } from '~/components/ui/IconButton';
import { Workbench } from '~/components/workbench/Workbench.client';
import { classNames } from '~/utils/classNames';
import { Messages } from './Messages.client';
import { SendButton } from './SendButton.client';

interface BaseChatProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined;
  messageRef?: RefCallback<HTMLDivElement> | undefined;
  scrollRef?: RefCallback<HTMLDivElement> | undefined;
  showChat?: boolean;
  chatStarted?: boolean;
  isStreaming?: boolean;
  messages?: Message[];
  enhancingPrompt?: boolean;
  promptEnhanced?: boolean;
  input?: string;
  handleStop?: () => void;
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  enhancePrompt?: () => void;
  selectedFile?: string;
  onFileSelect?: (file: string) => void;
}

const EXAMPLE_PROMPTS = [
  { text: 'Build a todo app in React using Tailwind' },
  { text: 'Build a simple blog using Astro' },
  { text: 'Create a cookie consent form using Material UI' },
  { text: 'Make a space invaders game' },
  { text: 'How do I center a div?' },
];

const TEXTAREA_MIN_HEIGHT = 76;

export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
  (
    {
      textareaRef,
      messageRef,
      scrollRef,
      chatStarted = false,
      isStreaming = false,
      enhancingPrompt = false,
      promptEnhanced = false,
      messages,
      input = '',
      sendMessage,
      handleInputChange,
      enhancePrompt,
      handleStop,
    },
    ref,
  ) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

    const chatNotStarted = () => {
      return (
        <>
          <div className="w-full h-full space-y-8">
            <h1 className="text-5xl text-center font-bold text-bolt-elements-textPrimary mb-2">
              What can I help you with?
            </h1>
            {inputPanel()}
            <div id="examples" className="relative  justify-center">
              <div className="flex flex-col space-y-2 [mask-image:linear-gradient(to_bottom,black_0%,transparent_180%)] hover:[mask-image:none]">
                {EXAMPLE_PROMPTS.map((examplePrompt, index) => {
                  return (
                    <button
                      key={index}
                      onClick={(event) => {
                        sendMessage?.(event, examplePrompt.text);
                      }}
                      className="group flex items-center w-full gap-2 justify-center bg-transparent text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary transition-theme"
                    >
                      {examplePrompt.text}
                      <div className="i-ph:arrow-bend-down-left" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      );
    };

    const editorPanel = () => {
      return (
        <Messages
          ref={messageRef}
          className="flex flex-col w-full flex-1 max-w-[500px] p-2 mx-auto z-1"
          messages={messages}
          isStreaming={isStreaming}
        />
      );
    };

    const inputPanel = () => {
      return (
        <div
          className={classNames('relative w-full max-w-chat mx-auto z-prompt', {
            'sticky bottom-0': chatStarted,
          })}
        >
          <div
            className={classNames(
              'shadow-sm border border-bolt-elements-borderColor bg-bolt-elements-prompt-background backdrop-filter backdrop-blur-[8px]  overflow-hidden',
            )}
          >
            <textarea
              ref={textareaRef}
              className={`w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-md text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent`}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  if (event.shiftKey) {
                    return;
                  }

                  event.preventDefault();

                  sendMessage?.(event);
                }
              }}
              value={input}
              onChange={(event) => {
                handleInputChange?.(event);
              }}
              style={{
                minHeight: TEXTAREA_MIN_HEIGHT,
                maxHeight: TEXTAREA_MAX_HEIGHT,
              }}
              placeholder="How can Bolt help you today?"
              translate="no"
            />
            <ClientOnly>
              {() => (
                <SendButton
                  show={input.length > 0 || isStreaming}
                  isStreaming={isStreaming}
                  onClick={(event) => {
                    if (isStreaming) {
                      handleStop?.();
                      return;
                    }

                    sendMessage?.(event);
                  }}
                />
              )}
            </ClientOnly>
            <div className="flex justify-between text-sm p-4 pt-2">
              <div className="flex gap-1 items-center">
                <IconButton
                  title="Enhance prompt"
                  disabled={input.length === 0 || enhancingPrompt}
                  className={classNames({
                    'opacity-100!': enhancingPrompt,
                    'text-bolt-elements-item-contentAccent! pr-1.5 enabled:hover:bg-bolt-elements-item-backgroundAccent!':
                      promptEnhanced,
                  })}
                  onClick={() => enhancePrompt?.()}
                >
                  {enhancingPrompt ? (
                    <>
                      <div className="i-svg-spinners:90-ring-with-bg text-bolt-elements-loader-progress text-xl"></div>
                      <div className="ml-1.5">Enhancing prompt...</div>
                    </>
                  ) : (
                    <>
                      <div className="i-bolt:stars text-xl"></div>
                      {promptEnhanced && <div className="ml-1.5">Prompt enhanced</div>}
                    </>
                  )}
                </IconButton>
              </div>
              {input.length > 3 ? (
                <div className="text-xs text-bolt-elements-textTertiary">
                  Use <kbd className="kdb">Shift</kbd> + <kbd className="kdb">Return</kbd> for a new line
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={classNames('relative flex h-full w-full overflow-hidden bg-gray-900')}>
        <ClientOnly>{() => <Menu />}</ClientOnly>
        <div
          ref={scrollRef}
          className={classNames('flex overflow-scroll', { 'w-full items-center mt-24': !chatStarted })}
        >
          <div className={classNames('flex flex-col flex-grow h-full')}>
            {chatStarted ? (
              <>
                {editorPanel()}
                {inputPanel()}
              </>
            ) : (
              <>{chatNotStarted()}</>
            )}
          </div>
        </div>
        {chatStarted && (
          <div className="relative flex-grow h-full w-full">
            <ClientOnly>{() => <Workbench chatStarted={chatStarted} isStreaming={isStreaming} />}</ClientOnly>
          </div>
        )}
      </div>
    );
  },
);
