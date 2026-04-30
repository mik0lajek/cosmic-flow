# Analiza UX — Cosmic Flow

## Problem i potrzeba użytkownika

Większość stron o kosmosie wygląda jak Wikipedia — ściana tekstu, tabelki z danymi, zero emocji. Tymczasem temat eksploracji kosmosu, a szczególnie kolonizacji Marsa, jest z natury ekscytujący. Cosmic Flow wychodzi z założenia, że można to pokazać inaczej: jako przeżycie, nie encyklopedię.

Strona pełni rolę landing page'a dla fikcyjnej inicjatywy kolonizacji Marsa. Jej zadanie to nie tylko przekazanie informacji, ale doprowadzenie użytkownika do momentu, w którym chce wesprzeć misję — i sprawienie, żeby ta decyzja wydała mu się naturalna.

---

## Grupa docelowa

Przede wszystkim ludzie, którzy śledzą Starship, oglądają relacje z lądowań SpaceX i wiedzą, czym różni się Merkury od Marsa. Wiek 20–40 lat, przyzwyczajeni do dobrego designu w internecie, niecierpliwi wobec przeciętnych stron.

Drugą grupą są potencjalni darczyńcy — stąd w ostatniej sekcji tabela top donorów i pasek postępu finansowania. To klasyczny mechanizm social proof: „inni już wpłacili, dołącz do nich."

Wspólna cecha obu grup: nie boją się animacji i eksperymentalnych interfejsów, ale za to szybko wychodzą, jeśli strona jest wolna albo chaotyczna.

---

## Struktura strony

Strona działa na zasadzie scroll-snap — każda sekcja zajmuje cały ekran i „klika" na miejscu przy przewijaniu. Dzięki temu użytkownik nie scrolluje chaotycznie, tylko przemieszcza się krok po kroku, jak przez prezentację.

Kolejność sekcji nie jest przypadkowa — to podróż od Słońca przez kolejne planety aż do Marsa:

- **Header** — pierwsze wrażenie, duże „DISCOVER", astronauta, klimat od razu ustawiony
- **Słońce → Merkury → Wenus → Ziemia** — każda planeta z własnymi faktami i grafiką, tworzy kontekst i rytm
- **Mars** — tutaj narracja się zmienia: przestaje być „kolejna planeta", staje się „nasz nowy dom"
- **Colony** — finał i call to action: misja, statystyki, funding, przycisk wsparcia

To klasyczna struktura narracyjna: najpierw świat, potem problem, potem rozwiązanie, potem działanie. Użytkownik nie trafia od razu na formularz — musi najpierw poczuć, o co chodzi.

---

## Kolorystyka i układ sekcji

Czarne tło to oczywisty wybór przy tematyce kosmicznej, ale nie chodzi tylko o estetykę — ciemny motyw sprawia, że zdjęcia planet wyglądają o niebo lepiej niż na białym tle. Każda planeta ma swój własny akcent kolorystyczny dopasowany do jej charakteru (ciepłe tony dla Słońca, czerwień dla Marsa), co pomaga użytkownikowi orientować się, gdzie jest, bez czytania nagłówka.

Typografia oparta na Playfair Display (szeryfowy krój) celowo nawiązuje do magazynów i plakatów, a nie do technicznego UI. Duże, pisane wersalikami nagłówki działają jak billboard — widać je nawet przy szybkim scrollowaniu.

W sekcjach z planetami układ jest prosty: duże zdjęcie planety po jednej stronie, fakty i opis po drugiej. Emocje i dane w jednym miejscu, bez potrzeby szukania. Sekcja Colony działa trochę inaczej — trzy kolumny naraz pokazują cel misji, jej postęp finansowy i listę donorów. Wszystko co potrzebne do podjęcia decyzji o wsparciu jest widoczne bez przewijania.

Animacje (pasek postępu finansowania, przejścia między widokami planet) uruchamiają się w momencie wejścia w sekcję. To nieduży detal, ale sprawia, że strona wydaje się żywa — nie statyczna jak broszura.
