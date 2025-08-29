import type { JobSiteArrayType } from "../types/JobSiteArrayType";
export default function JobSiteTableData({ jobSites } : JobSiteArrayType) {
  const jobsites = jobSites || [{ id: 1, name: "Jobsite 1", status: 0 }];
  return (
    <div className="overflow-scroll">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white">
            <th className="openSans font-semibold text-center py-3 px-4">
              Jobsite Name
            </th>
            <th className="openSans font-semibold text-center py-3 px-4">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {jobsites.map((job, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[#f8f8fa]" : "bg-white"}
            >
              <td className="openSans font-semibold text-[#1264A3] text-center py-2 px-4">
                {job.name}
              </td>
              <td className="openSans font-semibold flex justify-center items-center py-2 px-4">
                <StatusBadge status={job.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: number }) {
  let bgColor = "";
  let text = "";

  switch (status) {
    case 1:
      bgColor = "bg-[#ECDE7C]";
      text = "On Road";
      break;
    case 2:
      bgColor = "bg-[#7AC14D]";
      text = "Completed";
      break;
    case 0:
      bgColor = "bg-[#FE4C4A]";
      text = "On Hold";
      break;
    default:
      bgColor = "bg-gray-200";
  }

  return (
    <div
      className={`w-[130px] h-[32px] flex justify-center items-center px-2 py-1 rounded-[5px] text-sm font-semibold ${bgColor} text-white`}
    >
      {text}
    </div>
  );
}
