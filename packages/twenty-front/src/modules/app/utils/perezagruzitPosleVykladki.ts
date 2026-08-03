/**
 * [set] Вкладка, открытая до выкладки, не должна падать в белый экран.
 *
 * Приложение собирается кусками, и в имя каждого куска вшит хэш содержимого:
 * `Table-CpZGWuWR.js`. После выкладки имена меняются, а вкладка, открытая
 * до неё, продолжает помнить старые. Когда человек переходит на экран,
 * которого ещё не касался, браузер идёт за куском по старому имени —
 * и **получает не «нет такого файла», а `index.html` с кодом 200**: так
 * устроена отдача одностраничного приложения. Браузер ждал JavaScript,
 * получил разметку, разбор падает — и вместо CRM остаётся белое поле.
 *
 * Само по себе это чинится перезагрузкой, но человек, увидевший белый экран,
 * про это не знает и делать этого не будет. Поэтому страница перезагружается
 * сама: свежий `index.html` принесёт свежие имена, и переход продолжится.
 *
 * Защита от вечного цикла — время последней попытки, а не «пробовали или нет».
 * Если кусок не загрузился снова через минуту, дело не в устаревших именах,
 * а в чём-то ещё — в сети, в отдаче, в сборке, — и частые перезагрузки этого
 * не исправят. Но и запрещать их навсегда нельзя: следующая выкладка чинится
 * ровно тем же способом, а вкладку до неё никто не закроет.
 */

const KLYUCH = 'set:posledniaya-perezagruzka-posle-vykladki';

/** Ближе этого промежутка второй раз не перезагружаем. */
const ZATISHYE_MS = 5 * 60 * 1000;

/** Обрывки, которыми браузеры сообщают именно об этой беде. */
const PRIMETY = [
  'failed to fetch dynamically imported module',
  'error loading dynamically imported module',
  'importing a module script failed',
  'unable to preload css',
  "unexpected token '<'",
];

const pohozheNaUstarevshiyKusok = (tekst: string) => {
  const nizhniy = tekst.toLowerCase();

  return PRIMETY.some((primeta) => nizhniy.includes(primeta));
};

const perezagruzitNeChashcheChemRazVZatishye = () => {
  const bylo = Number(sessionStorage.getItem(KLYUCH) ?? '0');

  if (Number.isFinite(bylo) && Date.now() - bylo < ZATISHYE_MS) {
    return;
  }

  sessionStorage.setItem(KLYUCH, String(Date.now()));
  window.location.reload();
};

export const perezagruzitPosleVykladki = () => {
  // Штатное событие сборщика: не смог подгрузить кусок кода или стилей.
  window.addEventListener('vite:preloadError', (sobytie) => {
    sobytie.preventDefault();
    perezagruzitNeChashcheChemRazVZatishye();
  });

  // Событие приходит не всегда: часть промахов всплывает обычной ошибкой
  // разбора модуля. Поэтому ещё и общий перехват — но строго по приметам,
  // чтобы не перезагружать страницу на любой ошибке приложения.
  window.addEventListener('unhandledrejection', (sobytie) => {
    const prichina: unknown = sobytie.reason;
    const tekst =
      typeof prichina === 'string'
        ? prichina
        : ((prichina as Error | undefined)?.message ?? '');

    if (pohozheNaUstarevshiyKusok(tekst)) {
      perezagruzitNeChashcheChemRazVZatishye();
    }
  });

  window.addEventListener('error', (sobytie) => {
    if (pohozheNaUstarevshiyKusok(sobytie.message)) {
      perezagruzitNeChashcheChemRazVZatishye();
    }
  });
};
