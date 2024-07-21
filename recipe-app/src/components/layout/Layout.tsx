import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../../pages/components/footer/Footer";
import { ToastContainer } from "react-toastify";

import "./layout.scss";

function Layout() {
	return (
		<>
			<div className='layout-container'>
				<Navbar />
				<div className='layout-content'>
					<Outlet />
				</div>
				<div className='footer'>
					<Footer />
				</div>
			</div>
			<ToastContainer position='top-center' />
		</>
	);
}

export default Layout;
