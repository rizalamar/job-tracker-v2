import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/add" element />
				<Route path="/job/:id" element />
				<Route path="/edit/:id" element />
			</Routes>
		</Router>
	);
}
