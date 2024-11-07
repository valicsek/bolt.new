import { WebContainer } from '@webcontainer/api';
import { WORK_DIR_NAME } from '~/utils/constants';

interface WebContainerContext {
  loaded: boolean;
}

export const webcontainerContext: WebContainerContext = import.meta.hot?.data.webcontainerContext ?? {
  loaded: false,
};

if (import.meta.hot) {
  import.meta.hot.data.webcontainerContext = webcontainerContext;
}

export let webcontainer: Promise<WebContainer> = new Promise(() => {
  // noop for ssr
});

export async function saveChanges() {
  const container = await webcontainer;
  // @ts-ignore
  const files = await container.fs.readdir('.', { recursive: true });
  debugger;
  for (const file_name of files) {
    if (file_name.includes('.')) {
      const content = await container.fs.readFile(file_name, 'utf-8');
      await container.fs.writeFile(file_name, content);
    }
  }
}

if (!import.meta.env.SSR) {
  webcontainer =
    import.meta.hot?.data.webcontainer ??
    Promise.resolve()
      .then(() => {
        return WebContainer.boot({ workdirName: WORK_DIR_NAME });
      })
      .then((webcontainer) => {
        webcontainerContext.loaded = true;
        return webcontainer;
      });

  if (import.meta.hot) {
    import.meta.hot.data.webcontainer = webcontainer;
  }
}
