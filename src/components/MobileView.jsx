import { Link } from "react-router-dom";
import { getDate } from "../utils/utils";

export default function MobileView({ jobs, handleDelete }) {
	return (
		<div className="grid gap-4 mt-6 sm:hidden">
			{jobs.map((job) => {
				return (
					<div
						key={job.id}
						className="p-4 bg-white border-gray-100 rounded shadow-sm"
					>
						<h3 className="font-semibold text-gray-800">
							{job.company}
						</h3>
						<p className="text-sm text-gray-500">{job.position}</p>

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
	);
}
