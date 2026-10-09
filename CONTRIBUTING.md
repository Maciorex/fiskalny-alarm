# Jak dorzucić metaforę albo żart

1. Zrób fork repozytorium i własną gałąź. Zmiany trafiają do `main` przez pull request.
2. Dla prawdziwej wypowiedzi dodaj źródło w `src/data.mjs`: link, mówcę, potwierdzoną datę i kontekst. Preferuj stenogram, nagranie lub tekst autorski. Nagłówek nie wystarcza do przypisania cytatu.
3. Oddziel krótki cytat od omówienia. Łączny limit w katalogu to 25 cytowanych słów na publikację. Nie przedstawiaj zarzutów rozmówcy jako potwierdzonych ustaleń.
4. Autorskie scenki dopisz do `src/engine.mjs`. Nie podpisuj wymyślonego tekstu nazwiskiem realnej osoby. Powiązanie `motif` oznacza inspirację, nie cytat.
5. Uruchom `node build.mjs` i `node verify.mjs`. Dołącz zmienione źródła oraz wynik w `docs/index.html` i `dist/index.html`. Instalacja pakietów nie jest potrzebna.
6. Otwórz PR z krótkim opisem i linkami do nowych źródeł. Właściciel `Maciorex` decyduje o przyjęciu zmiany.

Gałąź `main` jest chroniona przed bezpośrednimi pushami, usunięciem i force pushem. Właściciel ma wyjątek wyłącznie na ścieżce pull requestu, dzięki czemu może także połączyć PR utworzony ze swojego konta. Publiczna strona aktualizuje się dopiero po merge do `main`.
