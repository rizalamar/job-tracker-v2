import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/add" element={<AddJob />} />
				<Route path="/job/:id" element />
				<Route path="/edit/:id" element />
			</Routes>
		</Router>
	);
}
