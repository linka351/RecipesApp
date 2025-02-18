import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import image from "../../../images/pexels-minan1398-1482803.jpg";
import "./landingPage.scss";
import { PiTableBold } from "react-icons/pi";
import { FaHourglassHalf } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

function LandingPage() {
	return (
		<>
			<Navbar />
			<div className='landing-container'>
				<div className='image-container'>
					<img className='landing-image' src={image} />
					<p className='image-description'>
						Twoja aplikacja do przepisów i planowania żywienia. Planuj i
						organizuj swoje posiłki z łatwością!
					</p>
				</div>

				<div className='app-work'>
					<div className='app-work-element'>
						<PiTableBold className='icon' />
						<p className='app-work-title'>
							Planowanie posiłków – Organizuj tygodniowy jadłospis zgodnie ze
							swoimi preferencjami.
						</p>
					</div>
					<div className='app-work-element'>
						<FaHourglassHalf className='icon' />
						<p className='app-work-title'>
							Zarządzaj swoimi ulubionymi przepisami i twórz spersonalizowane
							plany żywieniowe w jednym miejscu! Dzięki naszej aplikacji
							oszczędzisz czas.
						</p>
					</div>
					<div className='app-work-element'>
						<IoPersonSharp className='icon' />
						<p className='app-work-title'>
							Personalizacja – Dostosuj plan żywieniowy do swoich potrzeb.
						</p>
					</div>
				</div>
				<div className='action-container'>
					<p className='landing-text'>Jak to działa?</p>
					<div className='landing-section'>
						<img src={image} className='image-landing' />
						<p className='landing-image-text'>
							Dodaj swoje przepisy – Podaj składniki i instrukcje, a także dodaj
							zdjęcie do swojego przepisu. Zapisuj swoje ulubione przepisy, aby
							nigdy o nich nie zapomnieć.
						</p>
					</div>
					<div className='landing-section'>
						<img src={image} className='image-landing' />
						<p className='landing-image-text'>
							Stwórz plan żywieniowy – Na podstawie dodanych przez ciebie
							przepisów stwórz swój własny plan tygodniowy. Zyskasz lepszą
							kontrolę nad swoją dietą i ułatwisz sobie codzienne gotowanie.
						</p>
					</div>
					<div className='landing-section'>
						<img src={image} className='image-landing' />
						<p className='landing-image-text'>
							Łatwe wyszukiwanie przepisów – Z pomocą naszej wyszukiwarki w
							krótkim czasie znajdź idealne danie na każdą okazję.
						</p>
					</div>
				</div>
				<div className='register-container'>
					<p className='register-text'>
						Dołącz do naszej społeczności i ułatw sobie planowanie posiłków już
						dziś!
					</p>
					<button className='register'>Zarejestruj się</button>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default LandingPage;
