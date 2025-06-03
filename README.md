# 🍽️ Meal Planner App

Aplikacja do zarządzania przepisami i tworzenia planów posiłków. Pozwala na dodawanie prywatnych oraz publicznych przepisów, układanie planów na wybrane dni oraz łatwe wyszukiwanie i organizowanie potraw.

---

## 🚀 Funkcje

- ✅ Dodawanie, edytowanie i usuwanie przepisów
- ✅ Tworzenie planów posiłków z listą przepisów
- ✅ Obsługa przepisów prywatnych i publicznych
- ✅ Przeglądanie i filtrowanie listy planów
- ✅ Wgrywanie zdjęcia do przepisu
- ✅ Autoryzacja użytkowników (Firebase Auth)
- ✅ Zapis danych w chmurze (Firebase Firestore)

---

## 🛠️ Technologie

- **React** + **TypeScript**
- **SCSS** do stylizacji
- **Formik** do obsługi formularzy
- **Yup** do walidacji
- **Firebase** (Firestore + Auth + Storage)
- **React Router**
- **React Toastify** – powiadomienia
- **React Icons**

---

## 📸 Zrzuty ekranu

### Lista planów

![Lista planów](./recipe-app/src/images/lista%20planów.png)

### Lista przepisów

![Lista przepisów](./recipe-app/src/images/lista%20przepisów.png)

### Dodawanie nowego przepisu

![Nowy przepis](./recipe-app/src/images/Nowy%20przepis.png)

---

## ▶️ Jak uruchomić projekt lokalnie

1. **Sklonuj repozytorium:**

   ```bash
   git clone https://github.com/twoja-nazwa-uzytkownika/meal-planner.git
   cd meal-planner
   ```

2. **Zainstaluj zależności:**

   ```bash
   npm install
   ```

3. **Skonfiguruj Firebase:**

   Utwórz plik `.env.local` z poniższą zawartością:

   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

4. **Uruchom aplikację:**
   ```bash
   npm run dev
   ```

---

## 📁 Struktura projektu

```
src/
│
├── components/        // Reużywalne komponenty UI
├── features/          // Główne funkcjonalności (przepisy, plany, auth)
├── pages/             // Widoki stron
├── styles/            // SCSS globalne i zmienne
├── firebase/          // Konfiguracja Firebase
├── utils/             // Funkcje pomocnicze
└── App.tsx            // Główna konfiguracja routingu
```

---

## ✍️ Autor

- Imię i nazwisko: Kamil Linka
- GitHub: https://github.com/linka351

---
