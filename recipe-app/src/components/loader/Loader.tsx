import { Oval } from "react-loader-spinner";
import "./loader.scss";

function Loader() {
	return (
		<div className='full-page-loader'>
			<Oval
				height={100}
				width={100}
				color='#ffffff'
				ariaLabel='Zapisywanie przepisu'
				secondaryColor='#ffffff'
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</div>
	);
}

export default Loader;
