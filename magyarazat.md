# Projekt magyarázat

Ez a dokumentum röviden és egyszerűen elmagyarázza a projekt felépítését és a fájlok szerepét.

## Projekt struktúra

A projekt egy webalkalmazás, amely React és TypeScript technológiákat használ. A fő komponensek a következők:

1. **app/** - Az alkalmazás fő könyvtára
   - **components/** - React komponensek
   - **lib/** - Segédfüggvények és könyvtárak
   - **types/** - TypeScript típusdefiníciók
   - **utils/** - Segédeszközök

2. **types/** - Globális típusdefiníciók

## Fő fájlok és szerepük

### Komponensek (app/components/)

- **chat/** - Chat funkcionalitással kapcsolatos komponensek
  - `Artifact.tsx`, `AssistantMessage.tsx`, `UserMessage.tsx` - Különböző üzenettípusok megjelenítése
  - `CodeBlock.tsx` - Kódblokkok megjelenítése
  - `Markdown.tsx` - Markdown tartalom renderelése
  - `Messages.client.tsx` - Üzenetek listázása
  - `SendButton.client.tsx` - Üzenetküldő gomb

- **editor/** - Kódszerkesztővel kapcsolatos komponensek
  - `codemirror/languages.ts` - CodeMirror nyelvtámogatás konfigurálása

- **header/** - Fejléc komponensek
  - `HeaderActionButtons.client.tsx` - Fejléc akciógombok

- **ui/** - Általános UI komponensek
  - `Dialog.tsx`, `LoadingDots.tsx`, `PanelHeader.tsx`, stb. - Különböző UI elemek

- **workbench/** - Munkaterülettel kapcsolatos komponensek
  - `PortDropdown.tsx` - Port kiválasztó legördülő menü

### Könyvtárak és segédfüggvények (app/lib/)

- `.server/llm/model.ts` - Nyelvi modell konfigurálása (Anthropic)
- `fetch.ts` - Fetch kérések kezelése
- `hooks/useShortcuts.ts` - Billentyűparancsok kezelése
- `stores/theme.ts` - Téma kezelése
- `webcontainer/index.ts` - WebContainer funkcionalitás

### Típusok és segédeszközök

- `app/types/` - Alkalmazás-specifikus típusdefiníciók
- `app/utils/` - Segédfüggvények (pl. classNames, mobile detection)

### Konfigurációs fájlok

- `load-context.ts` - Környezeti változók és kontextus betöltése
- `worker-configuration.d.ts` - Worker konfigurációs típusok

Ez a struktúra lehetővé teszi a kód moduláris szervezését és a különböző funkcionalitások elkülönítését, ami megkönnyíti a fejlesztést és a karbantartást.
