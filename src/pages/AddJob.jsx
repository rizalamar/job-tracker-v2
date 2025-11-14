import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToday } from "../utils/utils";

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
						name="company"
						id="company"
						value={form.company}
						onChange={handleChange}
						placeholder="e.g Google Inc."
						required
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
						name="position"
						id="position"
						value={form.position}
						onChange={handleChange}
						placeholder="e.g Software Developer"
						required
						className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Date Applied */}
				<div className="">
					<label
						htmlFor="dateApplied"
						className="block mb-1 text-sm font-medium text-gray-700"
					>
						Date Applied
					</label>
					<input
						type="date"
						name="dateApplied"
						id="dateApplied"
						value={form.dateApplied}
						onChange={handleChange}
						required
						className="w-full p-2 text-sm border rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
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
						value={form.notes}
						onChange={handleChange}
						placeholder="Additional notes or status updates"
						rows="3"
						className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
						className="px-5 py-2 font-medium text-white transition bg-blue-600 rounded-lg cursor-pointer textsm hover:bg-blue-700"
					>
						Add
					</button>
				</div>
			</form>
		</section>
	);
}
