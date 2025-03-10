import "./navbar.scss";
import { TiThMenuOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";
import clsx from "clsx";
import Button from "../buttons/Button";

const getClassName = ({ isActive }: { isActive: boolean }) =>
	isActive ? "selected link" : "link";

function Navbar() {
	const [open, setOpen] = useState<boolean>(false);
	const { pathname } = useLocation();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) {
			document.documentElement.classList.remove("no-scroll");
		} else {
			document.documentElement.classList.add("no-scroll");
		}
	}, [open]);

	const toggleMenu = () => {
		setOpen(prev => !prev);
	};

	const navOffcanvasClass = clsx("offcanvas-menu", { active: open });
	const overlayClass = clsx("overlay", { active: open });

	return (
		<>
			<nav className='navbar'>
				<Button onClick={toggleMenu} className='menu'>
					<TiThMenuOutline className='menu-icon' />
				</Button>
				<Link className='logo-link' to={"/"}>
					<div className='logo'>
						<GiRiceCooker className='icon' />
						<p>RecipesApp</p>
					</div>
				</Link>
			</nav>
			<div className={overlayClass} onClick={toggleMenu}></div>
			<nav className={navOffcanvasClass}>
				<Button onClick={toggleMenu} className='menu'>
					<TiThMenuOutline className='menu-icon' />
				</Button>
				<ul className='menu-links'>
					<li>
						<NavLink className={getClassName} to={"/"}>
							Strona Główna
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={"/app/recipes"} end>
							Przepisy
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={"/app/recipes/add"}>
							Dodaj Przepis
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={"/app/meal-plans"} end>
							Plany Żywnościowe
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={"/app/meal-plans/add"}>
							Dodaj Plan Żywnościowy
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
