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

## Ograniczenia QA

Nie przeprowadzono pełnego renderowanego testu przeglądarkowego. Środowisko odmówiło uruchomienia lokalnego serwera, przeglądarki testowej oraz podglądu pliku przez zakaz protokołu `file:`. Nie obchodzono tego ograniczenia. Pomyślne testy logiki i kontrola źródła nie stanowią potwierdzenia wizualnej poprawności we wszystkich rozmiarach ekranu.

WebMCP jest opcjonalną, wykrywaną funkcją. Narzędzie `generate_fiscal_alarm` korzysta z tej samej funkcji co interfejs, waliduje argumenty przed zmianą stanu oraz jawnie zwraca `fictional: true`. Walidacja w przeglądarce obsługującej WebMCP jest niedostępna w tym środowisku; ta funkcja nie była żądanym warunkiem działania.

Archiwum dokumentuje użycie metafor, nie trafność diagnoz ani bieżące ryzyko fiskalne. Część materiałów prasowych może wymagać subskrypcji do przeczytania całości. Research to ręczny snapshot z 9 października 2026.

## Publikacja — GitHub Pages

Hosting projektu przeniesiono do publicznego repozytorium `Maciorex/fiskalny-alarm`. Build przygotowuje katalog `docs` dla Pages oraz samodzielny plik w `dist`. Dodano licencję MIT dla kodu i autorskich tekstów, z wyłączeniem cytatów osób trzecich.

Publikacja odbywa się automatycznie po wypchnięciu gałęzi `main`, ze źródła `/docs`. Status pierwszego wdrożenia jest sprawdzany osobno; sam zapis kodu do repozytorium nie jest potwierdzeniem działającej strony.
