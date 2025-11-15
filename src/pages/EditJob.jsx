import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/JobForm";

export default function EditJob() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		company: "",
		position: "",
		dateApplied: "",
		status: "",
		notes: "",
	});

	// get job data to be edited then display to form
	useEffect(() => {
		const storedJobs =
			JSON.parse(localStorage.getItem("job-application-v2")) || [];
		const jobToEdit = storedJobs.find((j) => j.id === Number(id));
		if (jobToEdit) {
			setTimeout(() => {
				setForm(jobToEdit);
			}, 0);
		}
	}, [id]);

	function handleChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		const storedJobs = JSON.parse(
			localStorage.getItem("job-application-v2")
		);
		const updatedJobs = storedJobs.map((job) =>
			job.id === Number(id) ? { ...job, ...form } : job
		);

		localStorage.setItem("job-application-v2", JSON.stringify(updatedJobs));
		navigate("/");
	}
	return (
		<section className="max-w-2xl px-4 py-8 mx-auto sm:px-8 sm:py-12">
			<h2 className="mb-6 text-xl font-semibold text-gray-700">
				Edit job application
			</h2>

			<JobForm
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				navigate={navigate}
				mode="edit"
			/>
		</section>
	);
}
