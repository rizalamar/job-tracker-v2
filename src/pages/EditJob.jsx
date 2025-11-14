import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

			<form
				onSubmit={handleSubmit}
				className="p-6 space-y-5 bg-white border border-gray-100 shadow-sm rounded-xl sm:p-8"
			>
				{/* Company */}
				<div className="">
					<label
						htmlFor="company"
						className="block mb-1 text-sm font-medium text-gray-700"
					>
						Company
					</label>
					<input
						type="text"
						id="company"
						name="company"
						value={form.company}
						onChange={handleChange}
						className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Position */}
				<div className="">
					<label
						htmlFor="position"
						className="block mb-1 text-sm font-medium text-gray-700"
					>
						Position
					</label>
					<input
						type="text"
						id="position"
						name="position"
						value={form.position}
						onChange={handleChange}
						className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Date applied */}
				<div className="">
					<label
						htmlFor="dateApplied"
						className="block mb-1 text-sm font-medium text-gray-700"
					>
						Date applied
					</label>
					<input
						type="date"
						name="dateApplied"
						id="dateApplied"
						value={form.dateApplied}
						onChange={handleChange}
						className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Status */}
				<div className="">
					<label
						htmlFor="status"
						className="block mb-1 text-sm font-medium text-gray-700"
					>
						Status
					</label>
					<select
						name="status"
						id="status"
						value={form.status}
						onChange={handleChange}
						className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="Pending">Pending</option>
						<option value="Interview">Interview</option>
						<option value="Accepted">Accepted</option>
						<option value="Rejected">Rejected</option>
					</select>
				</div>

				{/* Notes */}
				<div className="">
					<label
						htmlFor="notes"
						className="block mb-1 text-sm font-medium text-gray-700"
					>
						Notes
					</label>
					<textarea
						name="notes"
						id="notes"
						rows="3"
						value={form.notes}
						onChange={handleChange}
						className="w-full p-2 text-sm border rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Buttons */}
				<div className="flex items-center justify-end gap-3 pt-2">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="text-sm text-gray-500 cursor-pointer hover:underline"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
					>
						Save changes
					</button>
				</div>
			</form>
		</section>
	);
}
