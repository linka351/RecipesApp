import { Link } from "react-router-dom";
import "./footer.scss";
import { GiRiceCooker } from "react-icons/gi";

function Footer() {
	return (
		<div className='footer'>
			<Link to={"/"}>
				<GiRiceCooker className='icon' />
			</Link>
			<p className='text'>&copy; 2024 Recipe App</p>
		</div>
	);
}

export default Footer;
