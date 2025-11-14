import { Link } from "react-router-dom";
import { getDate } from "../utils/utils";

export default function Table({ jobs, handleDelete }) {
	return (
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
							<td className="px-4 py-3">{job.position}</td>
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
							<td className="flex justify-around px-4 py-3 space-x-2">
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
	);
}
