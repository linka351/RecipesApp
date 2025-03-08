import "./navbar.scss";
import { TiThMenuOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";
import { signOut, getAuth } from "firebase/auth";
import clsx from "clsx";
import Button from "../buttons/Button";

const getClassName = ({ isActive }: { isActive: boolean }) =>
	isActive ? "selected link" : "link";

function Navbar() {
	const [open, setOpen] = useState<boolean>(true);
	const { pathname } = useLocation();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const toggleMenu = () => {
		setOpen(prev => !prev);
	};

	const navOffcanvasClass = clsx("offcanvas-menu", { active: open });
	const navigate = useNavigate();

	const handleSignOut = async () => {
		const auth = getAuth();
		await signOut(auth)
			.then(() => {
				console.log("User signed out successfully");
				navigate("/");
			})
			.catch(error => {
				console.error("Error signing out:", error);
			});
	};

	return (
		<>
			<nav className='navbar'>
				<button onClick={toggleMenu} className='menu'>
					<TiThMenuOutline className='menu-icon' />
				</button>
				<Link className='logo-link' to={"/"}>
					<div className='logo'>
						<GiRiceCooker className='icon' />
						<p>RecipesApp</p>
					</div>
				</Link>
				<Button
					onClick={() => {
						handleSignOut();
					}}>
					Sign Out
				</Button>
			</nav>
			<nav className={navOffcanvasClass}>
				<ul>
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
