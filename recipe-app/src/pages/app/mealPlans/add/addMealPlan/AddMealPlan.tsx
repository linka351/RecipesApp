import { useEffect, useState } from "react";
import { Recipe } from "../../../../../types/editRecipe";
import { recipeApi } from "../../../../../api/recipes";

import "./addMealPlan.scss";

function AddMealPlan() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}

		fetchRecipes();
	}, []);

	const selectOption = () => {
		return (
			<select>
				{recipes.map(recipe => (
					<option key={recipe.id} value={recipe.id}>
						{recipe.name}
					</option>
				))}
			</select>
		);
	};

	return (
		<div className='container'>
			<p className='title'>Nowy Plan</p>
			<form className='add-meal-plan-form'>
				<label className='label'>
					Nazwa Planu
					<input type='text' className='plan-input' />
				</label>
				<label className='label'>
					Opis Planu
					<textarea className='plan-input plan-input-description' />
				</label>
				<table>
					<thead>
						<tr className='table-header'>
							<th></th>
							<th>Śniadanie</th>
							<th>Drugie Śniadanie</th>
							<th>Zupa</th>
							<th>Drugie danie</th>
							<th>kolacja</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th className='table-header'>Poniedziałek</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th className='table-header'>Wtorek</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th className='table-header'>Środa</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th className='table-header'>Czwartek</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th className='table-header'>Piątek</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th className='table-header'>Sobota</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th className='table-header'>Niedziela</th>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
							<td>{selectOption()}</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	);
}

export default AddMealPlan;
