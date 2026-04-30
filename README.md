# Cosmic Flow

Interaktywna strona landing page dla inicjatywy kolonizacji Marsa. Użytkownik przemierza Układ Słoneczny — od Słońca przez kolejne planety aż do Marsa i sekcji z misją kolonizacyjną — dzięki animowanemu, scroll-driven interfejsowi.

---

## Struktura projektu

```
cosmic-flow/
├── frontend/          # Aplikacja Next.js
└── backend/           # (w przygotowaniu)
```

---

## Frontend

### Stack

| Technologia | Wersja |
|-------------|--------|
| Next.js     | 16.2.2 |
| React       | 19.2.4 |
| TypeScript  | 5.x    |
| Tailwind CSS| 4.x    |

### Struktura `frontend/`

```
frontend/
├── app/                  # App Router (layout, strony, global CSS)
├── components/
│   ├── sections/         # Sekcje strony (Header, Sun, Mercury, Venus, EarthMoon, Mars, Colony)
│   └── utils/            # Komponenty pomocnicze (Scrollbar, SectionNav, HamburgerNav)
├── styles/               # Pliki CSS per sekcja
├── Images/               # Grafiki (tła, planety)
└── public/               # Pliki statyczne
```

### Uruchomienie

```bash
cd frontend
npm install
npm run dev
```

Aplikacja dostępna pod `http://localhost:3000`.


---

## Lighthouse

| Mobile | Desktop |
|--------|---------|
| ![Mobile](frontend/images/lightouse/mobile_LH.jpg) | ![Desktop](frontend/images/lightouse/desktop_LH.jpg) |

---

## Backend

> W przygotowaniu.


