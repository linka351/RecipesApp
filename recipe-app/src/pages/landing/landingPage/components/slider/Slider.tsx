import { useState } from "react";
import image1 from "../../../../../images/pexels-dana-tentis-118658-691114.jpg";
import image2 from "../../../../../images/pexels-pixabay-259763.jpg";
import image3 from "../../../../../images/pexels-minan1398-1482803.jpg";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import "./slider.scss";

const images = [
	{
		imagePath: image1,
		title: "Recipe App",
		text: "Skorzystaj z aplikacji do zarządzania swoimi przepisami",
	},
	{
		imagePath: image2,
		title: "Dodawaj Przepisy",
		text: "Dodaj swoje przepisy, aby mieć je w wygodnej aplikacji",
	},
	{
		imagePath: image3,
		title: "Dodaj swój plan żywnościowy",
		text: "Dodaj swoje przepisy do planu i rozplanuj swój tydzień żywieniowy",
	},
];

function Slider() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		if (currentIndex < images.length - 1) {
			setCurrentIndex(prev => prev + 1);
		} else {
			setCurrentIndex(0);
		}
	};
	const prevSlide = () => {
		if (currentIndex > 0) {
			setCurrentIndex(prev => prev - 1);
		} else {
			setCurrentIndex(prev => prev + images.length - 1);
		}
	};
	return (
		<>
			<div className='slider-container'>
				<div className='buttons-container'>
					<button
						className='slider-button'
						onClick={prevSlide}
						aria-label='prev'>
						<FaAngleLeft />
					</button>
					<button
						className='slider-button'
						onClick={nextSlide}
						aria-label='next'>
						<FaAngleRight />
					</button>
				</div>

				<img
					className='image'
					src={images[currentIndex].imagePath}
					alt={`image ${currentIndex + 1}`}
				/>
				<div className='slider-text'>
					<h2>{images[currentIndex].title}</h2>
					<p>{images[currentIndex].text}</p>
				</div>
			</div>
		</>
	);
}

export default Slider;
