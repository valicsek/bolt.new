import { useStore } from '@nanostores/react';
import { sidebarStore } from '~/lib/stores/sidebar';
import { ClientOnly } from 'remix-utils/client-only';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const store = useStore(sidebarStore);
  const toggleSidebar = () => sidebarStore.setKey('show', !store.show);

  return (
    <header className="flex p-5 items-center border-b border-gray-700 bg-gray-900 h-[var(--header-height)]">
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" onClick={toggleSidebar} />
      </div>
      <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
        <ClientOnly>{() => <ChatDescription />}</ClientOnly>
      </span>
    </header>
  );
}
