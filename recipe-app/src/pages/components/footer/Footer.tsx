import { Link } from "react-router-dom";
import "./footer.scss";
import { GiRiceCooker } from "react-icons/gi";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import { Tooltip as ReactTooltip } from "react-tooltip";

function Footer() {
	return (
		<>
			<div className='footer'>
				<div className='logo'>
					<Link className='footer-link' to={"/"} aria-label='home'>
						<GiRiceCooker className='icon' />
						<p className='text'>&copy; 2024 Recipe App</p>
					</Link>
				</div>
				<div className='social'>
					<a
						href='https://github.com/linka351'
						aria-label='github'
						data-tooltip-id='tooltip-1'>
						<FaGithub className='icon' />
					</a>

					<a
						href='https://www.linkedin.com/in/kamil-linka-1a4052219/'
						aria-label='linkedin'
						data-tooltip-id='tooltip-2'>
						<FaLinkedin className='icon' />
					</a>
				</div>
			</div>
			<ReactTooltip id='tooltip-1' content='Github' />
			<ReactTooltip id='tooltip-2' content='Linkedin' />
		</>
	);
}

export default Footer;
