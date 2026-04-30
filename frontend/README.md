# Analiza UX - Cosmic Flow

## Cel projektu

Cosmic Flow to interaktywny landing page o eksploracji Układu Słonecznego i fikcyjnej kolonizacji Marsa. Strona nie działa jak klasyczny serwis edukacyjny, tylko jak krótkie doświadczenie narracyjne: użytkownik przechodzi od zachwytu kosmosem do finałowej sekcji zachęcającej do wsparcia misji.

Najważniejszym celem UX jest zbudowanie emocji przed CTA. Użytkownik najpierw odkrywa kolejne planety, poznaje skalę przestrzeni i dopiero na końcu trafia na Marsa jako potencjalny nowy dom.

## Problem i grupa docelowa

Typowe strony o kosmosie często są statyczne i encyklopedyczne: dużo tekstu, tabel i mało emocji. Cosmic Flow rozwiązuje ten problem przez pełnoekranowe sekcje, mocne obrazy planet, animacje scroll-driven i krótkie porcje informacji.

Główna grupa odbiorców to osoby zainteresowane kosmosem, SpaceX, NASA i przyszłością eksploracji planet. Drugą grupą są potencjalni sympatycy lub darczyńcy fikcyjnej inicjatywy marsjańskiej. Dla nich ważne są elementy wiarygodności: statystyki, pasek finansowania, liczba wspierających i lista top donorów.

## Narracja strony

Doświadczenie jest zaprojektowane jako podróż zgodna z kolejnością sekcji w aplikacji:

1. Start
2. Sun
3. Mercury
4. Venus
5. Earth
6. Mars
7. Mission

Ta kolejność buduje prostą dramaturgię: najpierw zachwyt i skala, potem eksploracja planet, następnie refleksja nad Ziemią, a na końcu Mars jako cel. Finałowa sekcja `Colony` pełni funkcję konwersyjną i spina całą opowieść.

## Sekcje i ich rola UX

**Header** ustawia klimat od pierwszego ekranu. Tło kosmiczne, astronauta i duże `DISCOVER` działają jak scena otwierająca, a scroll indicator sugeruje dalszy ruch.

**Słońce, Merkury i Wenus** budują rytm eksploracji. Każda planeta ma własny charakter wizualny, animację i krótki zestaw faktów. Dane nie dominują nad doświadczeniem, tylko uzupełniają obraz.

**Ziemia i Księżyc** zmieniają ton na bardziej refleksyjny. To moment, w którym użytkownik widzi Ziemię jako wyjątkowy, ale kruchy dom. Parallax wzmacnia wrażenie przestrzeni.

**Mars** jest punktem zwrotnym. Nagłówek `OUR NEW HOME` przesuwa projekt z trybu edukacyjnego w misyjny: Mars nie jest już tylko kolejną planetą, ale możliwym celem ludzkości.

**Colony** odpowiada za działanie. Pokazuje cel misji, statystyki, postęp finansowania, liczbę wspierających, top donorów i przycisk wsparcia. To buduje social proof i poczucie, że inicjatywa już trwa.

## Nawigacja i interakcje

Strona używa `scroll-snap`, więc każda sekcja zatrzymuje się na pełnym ekranie. Dzięki temu użytkownik skupia się na jednym etapie podróży naraz, a projekt przypomina interaktywną prezentację.

Najważniejsze interakcje:

- przewijanie między pełnoekranowymi sekcjami,
- animacje uruchamiane przez scroll,
- lokalne przejścia wewnątrz sekcji,
- nawigacja punktowa i menu hamburgerowe,
- parallax w sekcji Ziemi,
- animowany pasek finansowania w sekcji kolonii.

Na mobile animacje są uproszczone i często ustawiane od razu w stanie końcowym. To dobry kompromis: desktop może być bardziej widowiskowy, a telefon powinien pozostać czytelny i płynny.

## Warstwa wizualna

Ciemny motyw naturalnie pasuje do tematu kosmosu i pozwala mocno wyeksponować planety, światła oraz kontrastową typografię. Playfair Display nadaje stronie editorialowy, plakatowy charakter, mniej techniczny niż typowe strony edukacyjne.

Każda planeta ma własny ton kolorystyczny i wizualny. Pomaga to użytkownikowi czuć zmianę miejsca, a nie tylko oglądać kolejne podobne sekcje.


## Podsumowanie

Cosmic Flow ma mocny fundament UX: prostą podróż, efektowną warstwę wizualną i logiczny finał w postaci misji kolonizacji Marsa. Najważniejsze do dopilnowania są płynność, czytelność na mobile i dostępność CTA.
