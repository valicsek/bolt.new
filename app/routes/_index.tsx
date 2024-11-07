import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [{ title: 'Github AI' }, { name: 'description', content: 'Talk with Github AI' }];
};

// https://remix.run/docs/ja/main/route/loader
export const loader = () => json({});

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-gray-900">
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
