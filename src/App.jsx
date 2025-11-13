import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element />
				<Route path="/add" element />
				<Route path="/job/:id" element />
				<Route path="/edit/:id" element />
			</Routes>
		</Router>
	);
}
