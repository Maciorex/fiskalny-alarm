# Review — 9 października 2026

## Zrealizowany zakres

Lekki generator, wybór motywu i poziomu dramatyzmu, historia ostatnich 100 alarmów z sesji, kopia z oznaczeniem fikcji, przeglądanie i filtrowanie źródłowego katalogu. Samodzielny HTML, bez zależności produkcyjnych i zapytań do zewnętrznych usług podczas działania.

## Sprawdzenie

- 4200 losowań obejmujących każdy temat i poziom: prawidłowy filtr, właściwe wstępy i puenty, brak dwóch kolejnych identycznych scenek.
- Wszystkie identyfikatory scenek, motywów i źródeł są unikalne, a każde powiązanie prowadzi do istniejącego elementu.
- Cytaty nie przekraczają 25 słów na publikację; źródła mają adresy HTTPS, brak przyszłych dat.
- Nieprawidłowy temat lub poziom losowania kończy się świadomym błędem.
- Kopia zawiera oznaczenie satyry i informację „nie cytat”. Przy niedostępnym schowku tekst zostaje zaznaczony w polu do ręcznego kopiowania.
- Brak wstrzykiwania HTML: treść katalogu i wyszukiwanie używają DOM `textContent`, adresy źródeł pochodzą ze stałego katalogu.
- Historia jest ograniczona do 100 elementów, strzałki mają kontrolę zakresu. Spacja nie przechwytuje edycji pól ani natywnej obsługi przycisków.
- Metadane, język polski, favicon, etykiety kontrolek, fokus, skip link oraz region wyników `aria-live` są obecne. Responsive CSS ma osobne układy mobilne i szerokie.

## Poprawki znalezione podczas review

- Skorygowano sprawdzone daty publikacji i rozróżniono transkrypcję od omówienia redakcyjnego.
- Poprawiono autorstwo kuli u nogi: Rostowski, nie Balcerowicz.
- Zachowano zastrzeżenia rozmówców dotyczące braku natychmiastowej katastrofy.
- Usunięto zależność od lokalnego serwera: wynik zawiera wszystkie zasoby w jednym pliku.
- Doprecyzowano, że historia dotyczy bieżącej sesji i obejmuje ostatnie 100 wyników.

## Sprawdzenie publicznej strony

9 października 2026 sprawdzono działającą stronę https://maciorex.github.io/fiskalny-alarm/ w przeglądarce:

- Losowanie zmienia komunikat i dopisuje go do historii; przycisk powrotu przechodzi do poprzedniego wyniku.
- Archiwum otwiera się z nawigacji. Wyszukiwanie `sepsa` pozostawia jeden właściwy motyw z linkiem do źródła.
- Przycisk kopiowania zgłasza sukces. Test przeglądarki nie potwierdził zawartości systemowego schowka; oznaczenie satyry w kopiowanym tekście sprawdzają testy logiki.
- Układ szeroki zweryfikowano wizualnie; [zrzut ekranu](review/desktop.jpg) dokumentuje działającą wersję.
- Przy szerokości 390 px karta wyniku i kontrolki mieszczą się w 350 px; dokument ma szerokość 390 px bez poziomego overflow. Wynik jest nad kontrolkami, tekst zawija się poprawnie. Przy długich komunikatach przycisk losowania wymaga przewinięcia w dół.
- Opcjonalne WebMCP zostało wykryte. Wywołanie dla `grecja`, poziom `2`, zmieniło widoczny wynik, temat i poziom oraz zwróciło `fictional: true`.

Nie jest to pełna macierz przeglądarek i urządzeń. Testy logiki obejmują 4200 losowań. Aplikacja nie korzysta z backendu, więc test interfejsu nie zmienia żadnych danych na serwerze.

Archiwum dokumentuje użycie metafor, nie trafność diagnoz ani bieżące ryzyko fiskalne. Część materiałów prasowych może wymagać subskrypcji do przeczytania całości. Research to ręczny snapshot z 9 października 2026.

## Publikacja — GitHub Pages

Hosting projektu przeniesiono do publicznego repozytorium `Maciorex/fiskalny-alarm`. Build przygotowuje katalog `docs` dla Pages oraz samodzielny plik w `dist`. Dodano licencję MIT dla kodu i autorskich tekstów, z wyłączeniem cytatów osób trzecich.

Publikacja odbywa się automatycznie po wypchnięciu gałęzi `main`, ze źródła `/docs`. Pierwsze wdrożenie potwierdzono statusem `built` w API Pages, a publiczny adres otwarto i sprawdzono w przeglądarce. HTTPS jest wymuszone.
