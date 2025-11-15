import React, { useEffect, useState } from "react";
import { dummyJobs } from "../utils/utils";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import MobileView from "../components/MobileView";

export default function Dashboard() {
	const [jobs, setJobs] = useState(() => {
		const storedJobs = JSON.parse(
			localStorage.getItem("job-application-v2")
		);
		return storedJobs && storedJobs.length > 0 ? storedJobs : dummyJobs;
	});

	useEffect(() => {
		localStorage.setItem("job-application-v2", JSON.stringify(jobs));
	});

	function handleDelete(id) {
		const updated = jobs.filter((job) => {
			return job.id !== id;
		});
		setJobs(updated);
		localStorage.setItem("job-application-v2", JSON.stringify(updated));
	}

	return (
		<section className="px-4 py-6 mx-auto max-w-7xl sm:px-8 sm:py-10">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-600 sm:text-2xl">
					Job Applications
				</h2>

				<Link
					to={"/add"}
					className="hidden px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg sm:block hover:bg-blue-700"
				>
					+ Add Job
				</Link>
			</div>

			{/* Mobile view */}
			<MobileView jobs={jobs} handleDelete={handleDelete} />

			{/* Desktop view */}
			<div className="hidden mt-6 overflow-hidden bg-white border border-gray-100 shadow-sm sm:block rounded-xl">
				<Table jobs={jobs} handleDelete={handleDelete} />
			</div>
		</section>
	);
}
