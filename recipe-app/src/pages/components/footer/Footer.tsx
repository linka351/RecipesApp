import { Link } from "react-router-dom";
import "./footer.scss";
import { GiRiceCooker } from "react-icons/gi";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

//TODO: dodać chmurki do linków i hover może jakiś

function Footer() {
	return (
		<>
			<div className='footer'>
				<div className='logo'>
					<Link className='link' to={"/"} aria-label='home'>
						<GiRiceCooker className='icon' />
						<p className='text'>&copy; 2024 Recipe App</p>
					</Link>
				</div>
				<div className='social'>
					<a href='https://github.com/linka351' aria-label='github'>
						<FaGithub className='icon' />
					</a>
					<a
						href='https://www.linkedin.com/in/kamil-linka-1a4052219/'
						aria-label='linkedin'>
						<FaLinkedin className='icon' />
					</a>
				</div>
			</div>
		</>
	);
}

export default Footer;
