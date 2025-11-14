import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function JobDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [job] = useState(() => {
		const storedJobs = JSON.parse(
			localStorage.getItem("job-application-v2")
		);
		const found = storedJobs.find((job) => job.id === Number(id));
		return found ? found : null;
	});

	useEffect(() => {
		console.log(job);
	}, [job]);

	function handleDelete() {
		const storedJobs = JSON.parse(
			localStorage.getItem("job-application-v2")
		);
		const updated = storedJobs.filter((job) => job.id !== Number(id));
		localStorage.setItem("job-application-v2", JSON.stringify(updated));
		navigate("/");
	}

	if (!job) {
		return (
			<p className="mt-10 text-center text-gray-500">Job not found.</p>
		);
	}

	return (
		<section className="max-w-2xl px-4 py-8 mx-auto sm:px-8">
			<h2 className="mb-6 text-2xl font-semibold text-gray-700">
				{job.company}
			</h2>

			<div className="p-6 space-y-3 bg-white border border-gray-100 shadow-sm rounded-xl">
				<p>
					<span className="font-medium text-gray-600">
						Position:{" "}
					</span>
					{job.position}
				</p>

				<p>
					<span className="font-medium text-gray-600">
						Date applied:{" "}
					</span>
					{job.dateApplied}
				</p>

				<p>
					<span className="font-medium text-gray-600">Status: </span>
					<span
						className={
							job.status === "Interview"
								? "text-blue-700"
								: job.status === "Accepted"
								? "text-green-700"
								: job.status === "Rejected"
								? "text-red-700"
								: "text-gray-500"
						}
					>
						{job.status}
					</span>
				</p>

				<p className="italic text-gray-600">{job.notes || "-"}</p>
			</div>

			<div className="flex items-center justify-between mt-8">
				<Link to={"/"} className="text-gray-500 hover:underline">
					Back to dashboard
				</Link>
				<div className="flex items-center gap-4">
					<Link
						to={`/edit/${job.id}`}
						className="px-4 py-2 text-sm text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-600"
					>
						Edit
					</Link>
					<Link
						onClick={() => handleDelete}
						className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
					>
						Delete
					</Link>
				</div>
			</div>
		</section>
	);
}
