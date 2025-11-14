import React, { useEffect, useState } from "react";
import { dummyJobs, getDate } from "../utils/utils";
import { Link } from "react-router-dom";

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
		<section className="max-w-7xl px-4 py-6 mx-auto sm:px-8 sm:py-10">
			<div className="flex items-center justify-between">
				<h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
					Job Applications
				</h2>

				<Link
					to={"/add"}
					className="hidden sm:block px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
				>
					+ Add Job
				</Link>
			</div>

			{/* Mobile view */}
			<div className="grid gap-4 sm:hidden mt-6">
				{jobs.map((job) => {
					return (
						<div
							key={job.id}
							className="bg-white p-4 border-gray-100 shadow-sm rounded"
						>
							<h3 className="font-semibold text-gray-800">
								{job.company}
							</h3>
							<p className="text-sm text-gray-500">
								{job.position}
							</p>

							<div className="mt-3 space-y-0.5 text-sm">
								<p>
									<span className="font-semibold text-gray-700">
										Date applied:{" "}
									</span>
									{getDate(job.dateApplied)}
								</p>

								<p>
									<span className="font-semibold text-gray-700">
										Status:{" "}
									</span>
									<span
										className={`font medium ${
											job.status === "Interview"
												? "text-blue-700"
												: job.status === "Accepted"
												? "text-green-700"
												: job.status === "Rejected"
												? "text-red-700"
												: "text-gray-500"
										}`}
									>
										{job.status}
									</span>
								</p>

								<p className="italic text-gray-600">
									{job.notes ? job.notes : "-"}
								</p>

								<div className="flex items-center justify-end gap-4 mt-8">
									<Link
										to={`/edit/${job.id}`}
										className="px-4 py-2 text-sm text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-600"
									>
										Edit
									</Link>
									<Link
										onClick={() => handleDelete(job.id)}
										className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
									>
										Delete
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Desktop view */}
			<div className="hidden mt-6 sm:block overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
				<table className="w-full text-left">
					<thead className="text-lg text-gray-700 bg-gray-200">
						<tr className="grid grid-cols-[1fr_1fr_1fr_100px_2fr_150px]">
							<th className="px-4 py-3">Company</th>
							<th className="px-4 py-3">Position</th>
							<th className="px-4 py-3">Date applied</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3">Notes</th>
							<th className="px-4 py-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job) => {
							return (
								<tr
									className="grid grid-cols-[1fr_1fr_1fr_100px_2fr_150px] border-b border-gray-300 hover:border-gray-200"
									key={job.id}
								>
									<td className="px-4 py-3 font-medium">
										{job.company}
									</td>
									<td className="px-4 py-3">
										{job.position}
									</td>
									<td className="px-4 py-3 text-sm">
										{getDate(job.dateApplied)}
									</td>
									<td className="px-4 py-3">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												job.status === "Interview"
													? "bg-blue-100 text-blue-700"
													: job.status === "Accepted"
													? "bg-green-100 text-green-700"
													: job.status === "Rejected"
													? "bg-red-100 text-red-700"
													: "bg-gray-100 text-gray-500"
											}`}
										>
											{job.status}
										</span>
									</td>
									<td className="px-4 py-3 italic">
										{job.notes ? job.notes : "-"}
									</td>
									<td className="flex justify-around space-x-2 px-4 py-3">
										<Link
											to={`/job/${job.id}`}
											className="text-blue-600 hover:underline"
										>
											View
										</Link>
										<Link
											to={`/edit/${job.id}`}
											className="text-yellow-500 hover:underline"
										>
											Edit
										</Link>
										<Link
											onClick={() => handleDelete(job.id)}
											className="text-red-500 hover:underline"
										>
											Delete
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
}
