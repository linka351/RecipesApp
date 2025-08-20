import { useState } from "react";
import "./landingPage.scss";
import image from "../../../images/StockCake-Healthy Meal Prep_1725388250.jpg";
import {
	IoMenu,
	IoClose,
	IoChevronForwardSharp,
	IoFastFood,
	IoCamera,
	IoCalendar,
} from "react-icons/io5";
import { GiRiceCooker } from "react-icons/gi";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/buttons/Button";

const App = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { handleLoginAsDemo } = useAuth();
	const navigate = useNavigate();

	const loginAsDemoAndRedirect = async () => {
		await handleLoginAsDemo();
		navigate("/app/recipes");
	};

	return (
		<div className='app'>
			<div className='header'>
				<div className='header-container'>
					<div className='header-logo'>RecipesApp</div>
					<Button
						className='header-mobile-menu'
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? <IoClose /> : <IoMenu />}
					</Button>
					<nav className={`header-nav ${isMenuOpen ? "header-nav-open" : ""}`}>
						<a className='header-link' href='#features'>
							Funkcje
						</a>
						<a className='header-link' href='#how-it-works'>
							Jak to działa
						</a>
						<a className='header-link' href='#pricing'>
							Cennik
						</a>
					</nav>
				</div>
			</div>

			<main>
				<div className='hero'>
					<div className='hero-container'>
						<div className='hero-content'>
							<h1 className='hero-header'>
								Twórz, planuj i organizuj swoje posiłki
							</h1>
							<p className='hero-text'>
								Odkryj łatwiejszy sposób na planowanie posiłków i zarządzanie
								przepisami. Wszystko w jednym miejscu.
							</p>
							<div className='landing-buttons'>
								<Link to={"/sign-up"} className='btn btn-primary btn-large'>
									Rozpocznij za darmo
									<IoChevronForwardSharp />
								</Link>
								<Button
									onClick={loginAsDemoAndRedirect}
									className='btn btn-primary btn-large'>
									Wypróbuj demo <IoChevronForwardSharp />
								</Button>
							</div>
						</div>
						<div className='hero-image-container'>
							<img
								src={image}
								className='hero-image'
								alt='Aplikacja w użyciu'
							/>
						</div>
					</div>
				</div>

				<div className='features' id='features'>
					<div className='features-container'>
						<h2 className='features-header'>Wszystko czego potrzebujesz</h2>
						<div className='features-grid'>
							<div className='features-card'>
								<IoFastFood className='features-icon' />
								<h3 className='features-card-header'>Twórz przepisy</h3>
								<p>
									Dodawaj własne przepisy, organizuj je w kategorie i miej do
									nich dostęp w każdej chwili.
								</p>
							</div>
							<div className='features-card'>
								<IoCamera className='features-icon' />
								<h3 className='features-card-header'>Dodawaj zdjęcia</h3>
								<p>
									Wzbogać swoje przepisy o piękne zdjęcia potraw. Wizualna
									dokumentacja Twoich kulinarnych dzieł.
								</p>
							</div>
							<div className='features-card'>
								<IoCalendar className='features-icon' />
								<h3 className='features-card-header'>Planuj posiłki</h3>
								<p>
									Twórz spersonalizowane plany żywieniowe na podstawie swoich
									ulubionych przepisów.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='how-it-works' id='how-it-works'>
					<div className='how-it-works-container'>
						<h2 className='how-it-works-header'>Jak to działa</h2>
						<div className='steps'>
							<div className='step'>
								<div className='step-number'>1</div>
								<h3>Załóż konto</h3>
								<p>Rozpocznij swoją kulinarną przygodę w kilka sekund.</p>
							</div>
							<div className='step'>
								<div className='step-number'>2</div>
								<h3>Dodaj przepisy</h3>
								<p>Wprowadź swoje ulubione przepisy i dodaj do nich zdjęcia.</p>
							</div>
							<div className='step'>
								<div className='step-number'>3</div>
								<h3>Stwórz plan</h3>
								<p>Zaplanuj swoje posiłki na cały tydzień.</p>
							</div>
						</div>
					</div>
				</div>

				<div className='cta'>
					<div className='cta-container'>
						<h2 className='cta-header'>Gotowy na kulinarną rewolucję?</h2>
						<p className='cta-text'>
							Dołącz do tysięcy zadowolonych użytkowników i zacznij planować
							swoje posiłki już dziś.
						</p>
						<div className='landing-buttons'>
							<Link to={"/sign-up"} className='btn btn-primary btn-large'>
								Rozpocznij za darmo
								<IoChevronForwardSharp />
							</Link>
							<Button
								onClick={loginAsDemoAndRedirect}
								className='btn btn-primary btn-large'>
								Wypróbuj demo
								<IoChevronForwardSharp />
							</Button>
						</div>
					</div>
				</div>
			</main>

			<footer className='landing-footer'>
				<div className='landing-footer-container'>
					<div className='landing-footer-content'>
						<div className='landing-footer-section'>
							<h4 className='landing-footer-section-header'>RecipesApp</h4>
							<p className='landing-footer-section-text'>
								Twój osobisty asystent w planowaniu posiłków.
							</p>
						</div>
						<div className='landing-footer-section'>
							<h4 className='landing-footer-section-header'>Nawigacja</h4>
							<a className='landing-footer-section-link' href='#features'>
								Funkcje
							</a>
							<a className='landing-footer-section-link' href='#how-it-works'>
								Jak to działa
							</a>
							<a className='landing-footer-section-link' href='#pricing'>
								Cennik
							</a>
						</div>
						<div className='landing-footer-section'>
							<h4 className='landing-footer-section-header'>Kontakt</h4>
							<div className='social'>
								<a
									className='landing-footer-section-link'
									href='https://github.com/linka351'
									aria-label='github'
									data-tooltip-id='tooltip-1'>
									<FaGithub className='social-icon' />
								</a>

								<a
									className='landing-footer-section-link'
									href='https://www.linkedin.com/in/kamil-linka-1a4052219/'
									aria-label='linkedin'
									data-tooltip-id='tooltip-2'>
									<FaLinkedin className='social-icon' />
								</a>
							</div>
						</div>
					</div>
					<div className='landing-footer-bottom'>
						<Link className='footer-link' to={"/"} aria-label='home'>
							<GiRiceCooker className='icon' />
							<p className='landing-footer-text'>&copy; 2024 Recipe App</p>
						</Link>
						<p className='landing-footer-text'>Wszelkie prawa zastrzeżone.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default App;
