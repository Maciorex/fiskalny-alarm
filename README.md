# Fiskalny Alarm

Satyryczny generator komunikatów o nadchodzącej katastrofie długu publicznego. Fikcyjny Instytut Paniki Fiskalnej produkuje alarmy, a osobne archiwum pokazuje udokumentowane inspiracje z debaty ekonomicznej.

- 72 autorskie scenki, 3 poziomy tonu, 6 kierunków katastrofy i tryb mieszany.
- 13 824 kombinacje (72 × 8 wstępów × 8 puent × 3 poziomy).
- 48 motywów i analogii w 22 źródłach z lat 2003–2026, z kontekstem oraz krótkimi cytatami.
- Historia ostatnich 100 komunikatów w bieżącej sesji; kopiowanie zawsze dodaje oznaczenie satyry.
- Filtr autora i wyszukiwanie w katalogu inspiracji.
- Całość działa po stronie przeglądarki. Brak API, backendu, analityki, zewnętrznych fontów i zależności produkcyjnych.

## Uruchomienie i edycja

Wymagany Node 20+. Instalacja pakietów nie jest potrzebna.

```sh
node build.mjs
node verify.mjs
```

Wynik: `dist/index.html`, samodzielny plik zawierający CSS, dane i JavaScript. Można otworzyć go bezpośrednio w przeglądarce lub umieścić na dowolnym hostingu statycznym. Clipboard API może być niedostępne w kontekście lokalnego pliku; wtedy aplikacja zaznacza gotowy tekst do ręcznego skopiowania.

`src/index.html` — układ i metadane. `src/style.css` — wygląd i responsywność. `src/data.mjs` — bibliografia oraz katalog motywów. `src/engine.mjs` — autorskie teksty i losowanie. `src/app.mjs` — interakcje i archiwum.

Nie przypisuj wygenerowanego zdania do realnej osoby. Przy dodawaniu cytatu sprawdź tekst i mówcę w źródle, zachowaj łączny limit 25 cytowanych słów na publikację. Omówienie analogii nie jest potwierdzeniem ekonomicznej trafności diagnozy.

## Hosting — GitHub Pages

Repozytorium: https://github.com/Maciorex/fiskalny-alarm

Docelowy adres strony: https://maciorex.github.io/fiskalny-alarm/

GitHub Pages publikuje katalog `docs` z gałęzi `main`. Build zapisuje identyczny, samodzielny HTML w `dist/index.html` i `docs/index.html`; plik `docs/.nojekyll` wyłącza przetwarzanie przez Jekyll. Hosting nie wymaga własnego serwera, usług API ani instalacji zależności.

Przy zmianach w źródłach uruchom `node build.mjs` oraz `node verify.mjs`, a następnie zacommituj źródła i wygenerowane pliki. GitHub automatycznie wdroży opublikowany katalog po pushu do `main`. Pierwsze włączenie Pages wymaga ustawienia źródła `main /docs`; kolejne publikacje odbywają się bez ręcznego deploya.

## Open source

Kod i autorskie teksty generatora są dostępne na [licencji MIT](LICENSE). Przytoczone wypowiedzi osób trzecich nie są objęte tą licencją; prawa do nich pozostają przy ich autorach. Krótkie cytaty w archiwum są oznaczone i mają przypisane źródła.

Pełne zestawienie źródeł, metodologia i pułapki atrybucji: [RESEARCH.md](RESEARCH.md). Wyniki sprawdzenia i ograniczenia QA: [REVIEW.md](REVIEW.md).
