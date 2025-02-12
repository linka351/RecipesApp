import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import image from "../../../images/pexels-minan1398-1482803.jpg";
import "./landingPage.scss";
import { PiTableBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
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
						<FaSearch className='icon' />
						<p className='app-work-title'>
							Łatwe wyszukiwanie przepisów – Znajdź idealne danie na każdą
							okazję.
						</p>
					</div>
					<div className='app-work-element'>
						<IoPersonSharp className='icon' />
						<p className='app-work-title'>
							Personalizacja – Dostosuj plan żywieniowy do swoich potrzeb.
						</p>
					</div>
				</div>
				/* jak to działa */
				<div>
					<div style={{ display: "flex" }}>
						<img src={image} style={{ width: "200px", height: "200px" }} />
						<p>
							Dodaj swoje przepisy – Wpisz składniki, instrukcje i zdjęcia
							ulubionych dań.
						</p>
					</div>

					<p>
						Stwórz plan żywieniowy – Wybierz posiłki na wybrane dni tygodnia.
					</p>
				</div>
				<div>Wypróbuj Teraz !!!!! rejestracja itp??</div>
			</div>
			<Footer />
		</>
	);
}

export default LandingPage;
