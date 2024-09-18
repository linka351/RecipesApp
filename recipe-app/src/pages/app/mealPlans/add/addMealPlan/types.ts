//to najpewniej powinny być tablice, a nie obiekt, ale nie chciało mi się pół apki przepisywać i firebase
//jak dorobisz przypisywanie planu do konkretnego tygodnia to się zobaczy jak będzie lepiej

export type MealPlan = {
	name: string;
	description: string;
	dateFrom: string;
	mealName: string[];
};
