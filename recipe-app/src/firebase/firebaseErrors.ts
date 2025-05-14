export const firebaseErrorMessages: Record<string, string> = {
	// Logowanie
	"auth/user-not-found": "Nie znaleziono konta z tym adresem e-mail.",
	"auth/wrong-password": "Nieprawidłowe hasło.",
	"auth/invalid-credential": "Nieprawidłowe dane logowania.",
	"auth/invalid-email": "Nieprawidłowy adres e-mail.",

	//  Rejestracja
	"auth/email-already-in-use":
		"Adres e-mail jest już przypisany do innego konta.",

	//  Ogólne
	"auth/network-request-failed":
		"Błąd sieci. Sprawdź swoje połączenie internetowe.",
	"auth/internal-error": "Wewnętrzny błąd serwera. Spróbuj ponownie później.",
};
