import { DayName } from "../../../../../../../types/MealPlan";

type Props = {
	days: DayName[];
};

function MealTableHeaderRow({ days }: Props) {
	return (
		<>
			<div className='header-cell'>
				<p>Nazwa Posiłku</p>
			</div>
			{days.map(day => (
				<div key={day} className='header-cell'>
					{day}
				</div>
			))}
		</>
	);
}

export default MealTableHeaderRow;
