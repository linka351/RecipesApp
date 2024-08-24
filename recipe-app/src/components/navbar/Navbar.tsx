import "./navbar.scss";
import { TiThMenuOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, NavLink } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";

type NavLinkRenderProps = {
	isActive: boolean;
};

const getClassName = ({ isActive }: NavLinkRenderProps) => isActive ? "selected link" : "link"

function Navbar() {
	const [open, setOpen] = useState<boolean>(true);
	const { pathname } = useLocation();

	const toggleMenu = () => {
		setOpen(prev => !prev);
	};

	useEffect(() => {
		console.log("effect", { pathname });

		setOpen(false);
	}, [pathname]);
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
			<nav className={`ofcanvas-menu ${open && "active"}`}>
				<ul>
					<li>
						<NavLink
							className={getClassName}
							to={"/"}>
							Strona Główna
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? "selected link" : "link"
							}
							to={"/app/recipes"}
							end>
							Przepisy
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? "selected link" : "link"
							}
							to={"/app/recipes/add"}>
							Dodaj Przepis
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? "selected link" : "link"
							}
							to={"/app/recipes/edit/:id"}>
							Edytuj Przepis
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? "selected link" : "link"
							}
							to={"/app/meal-plans"}
							end>
							Plany Żywnościowe
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? "selected link" : "link"
							}
							to={"/app/meal-plans/add"}>
							Dodaj Plan Żywnościowy
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? "selected link" : "link"
							}
							to={"/app/meal-plans/edit/:id"}>
							Edytuj Plan Żywnościowy
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
