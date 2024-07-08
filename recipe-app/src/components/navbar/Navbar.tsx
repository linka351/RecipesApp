import "./navbar.scss";
import { TiThMenuOutline } from "react-icons/ti";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";

function Navbar() {
	const [open, setOpen] = useState<boolean>(true);

	const toggleMenu = () => {
		setOpen(!open);
	};
	return (
		<>
			<div className='navbar'>
				<button onClick={toggleMenu} className='menu'>
					<TiThMenuOutline className='menu-icon' />
				</button>
				<Link className='logo-link' to={"/"}>
					<div className='logo'>
						<GiRiceCooker className='icon' />
						<p>RecipesApp</p>
					</div>
				</Link>
			</div>
			<nav className={`ofcanvas-menu ${!open && "active"}`}>
				<ul>
					<li>
						<Link className='link' to={"/"}>
							Strona Główna
						</Link>
					</li>
					<li>
						<Link className='link' to={"/app/recipes"}>
							Przepisy
						</Link>
					</li>
					<li>
						<Link className='link' to={"/app/recipes/add"}>
							Dodaj Przepis
						</Link>
					</li>
					<li>
						<Link className='link' to={"/app/recipes/edit/:id"}>
							Edytuj Przepis
						</Link>
					</li>
					<li>
						<Link className='link' to={"/app/meal-plans"}>
							Plany Żywnościowe
						</Link>
					</li>
					<li>
						<Link className='link' to={"/app/meal-plans/add"}>
							Dodaj Plan Żywnościowy
						</Link>
					</li>
					<li>
						<Link className='link' to={"/app/meal-plans/edit/:id"}>
							Edytuj Plan Żywnościowy
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
