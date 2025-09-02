import "./navbar.scss";
import { TiThMenuOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiRiceCooker } from "react-icons/gi";
import clsx from "clsx";
import Button from "../buttons/Button";
import { useAuth } from "../../context/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ROUTE } from "../../constants/routes.const";

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

		return () => {
			document.documentElement.classList.remove("no-scroll");
		};
	}, [open]);

	const toggleMenu = () => {
		setOpen(prev => !prev);
	};

	const navOffcanvasClass = clsx("offcanvas-menu", { active: open });
	const navigate = useNavigate();
	const { handleSignOut: signOut, user } = useAuth();

	const handleSignOut = async () => {
		await signOut()
			.then(() => {
				toast.success("Wylogowano pomyślnie");
				navigate(ROUTE.LANDING);
			})
			.catch(() => {
				toast.error("Wystąpił błąd przy wylogowaniu");
			});
	};
	const overlayClass = clsx("overlay", { active: open });

	return (
		<>
			<nav className='navbar'>
				<Button onClick={toggleMenu} className='menu'>
					<TiThMenuOutline className='menu-icon' />
				</Button>
				<Link className='logo-link' to={ROUTE.LANDING}>
					<div className='logo'>
						<GiRiceCooker className='icon' />
						<p>RecipesApp</p>
					</div>
				</Link>
				<div className='user'>
					{!user ? (
						<Link to={ROUTE.SIGN_IN} className='user-button'>
							<FaRegCircleUser className='user-icon' />
							<p>Zaloguj</p>
						</Link>
					) : (
						<Button className='user-button' onClick={handleSignOut}>
							<FaRegCircleUser className='user-icon' />
							<p>Wyloguj</p>
						</Button>
					)}
				</div>
			</nav>
			<div className={overlayClass} onClick={toggleMenu}></div>
			<nav className={navOffcanvasClass}>
				<Button onClick={toggleMenu} className='menu'>
					<TiThMenuOutline className='menu-icon active-menu-icon' />
				</Button>
				<ul className='menu-links'>
					<li>
						<NavLink className={getClassName} to={ROUTE.LANDING} end>
							Strona Główna
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={ROUTE.RECIPES} end>
							Przepisy
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={ROUTE.ADD_RECIPE}>
							Dodaj Przepis
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={ROUTE.MEAL_PLANS} end>
							Plany Żywnościowe
						</NavLink>
					</li>
					<li>
						<NavLink className={getClassName} to={ROUTE.ADD_MEAL_PLAN}>
							Dodaj Plan Żywnościowy
						</NavLink>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
