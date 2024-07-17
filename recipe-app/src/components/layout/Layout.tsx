import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../../pages/components/footer/Footer";

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
		</>
	);
}

export default Layout;
