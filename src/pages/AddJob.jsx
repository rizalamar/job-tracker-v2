import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToday } from "../utils/utils";
import JobForm from "../components/JobForm";

export default function AddJob() {
	const navigate = useNavigate();
	const [form, setForm] = useState(() => ({
		company: "",
		position: "",
		dateApplied: getToday(), //new Date().toLocaleDateString("id-ID")
		status: "Pending",
		notes: "",
	}));

	function handleSubmit(e) {
		e.preventDefault();
		const stored = JSON.parse(localStorage.getItem("job-application-v2"));
		const newJob = { id: Date.now(), ...form };
		localStorage.setItem(
			"job-application-v2",
			JSON.stringify([...stored, newJob])
		);
		navigate("/");
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	}

	return (
		<section className="max-w-2xl px-4 py-8 mx-auto sm:px-8 sm:py-12">
			<h2 className="mb-6 text-xl font-semibold text-gray-700">
				Add new job application
			</h2>

			<JobForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				navigate={navigate}
				mode="add"
			/>
		</section>
	);
}
