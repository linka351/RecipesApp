# 🍽️ Meal Planner App

Aplikacja do zarządzania przepisami i tworzenia planów posiłków. Pozwala na dodawanie prywatnych oraz publicznych przepisów, układanie planów na wybrane dni oraz łatwe wyszukiwanie i organizowanie potraw.

---

## ▶️ Demo

Aby przejść do aplikacji kliknij w link:

https://linka351.github.io/RecipesApp/

Następnie kliknij w przycisk wypróbuj demo aby włączyć wersję demonstracyjną.

---

## 🚀 Funkcje

- ✅ Dodawanie, edytowanie i usuwanie przepisów
- ✅ Tworzenie planów posiłków z listą przepisów na podstawie których można dostosować swoją dietę do swoich potrzeb i celów.
- ✅ Obsługa przepisów prywatnych i publicznych
- ✅ Przeglądanie i filtrowanie listy planów
- ✅ Autoryzacja użytkowników (Firebase Auth)
- ✅ System uprawnień (admin, dodaje przepisy publiczne, user dodaje przepisy prywatne)
- ✅ Zapis danych w chmurze (Firebase Firestore)

---

## 📸 Zrzuty ekranu

### Strona powitalna

![Demo](./recipe-app/src/videos/landing.gif)

### Lista planów

![Lista planów](./recipe-app/src/images/lista%20planów.png)

### Lista przepisów

![Lista przepisów](./recipe-app/src/images/lista%20przepisów.png)

### Dodawanie nowego przepisu

![Nowy przepis](./recipe-app/src/images/Nowy%20przepis.png)

---

## 🛠️ Technologie

- **React** + **TypeScript**
- **SCSS**
- **Formik**
- **Yup**
- **Firebase** (Firestore + Auth + Storage)
- **React Router**
- **React Toastify**
- **React Icons**

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

3. **Uruchom aplikację:**
   ```bash
   npm run dev
   ```

---

## ✍️ Autor

- Imię i nazwisko: Kamil Linka
- GitHub: https://github.com/linka351

---
