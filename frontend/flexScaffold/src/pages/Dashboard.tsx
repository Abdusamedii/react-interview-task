import { useEffect, useState } from "react";
import JobSiteTable from "../components/JobSiteTable"
import StatusOverview from "../components/StatusOverview"
import { getJobSites } from "../api/JobSites";
import type { JobSite } from "../types/JobSiteType";
function Dashboard() {

  const [jobSites, setJobSites] = useState<JobSite[]>([]);
  const [statusCounts, setStatusCounts] = useState<{ [key: number]: number }>(
    {}
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobSites();
        setJobSites(data.data);
      } catch (err) {
        console.error("Failed to load job sites:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const counts: { [key: number]: number } = { 0: 0, 1: 0, 2: 0 }; 

    jobSites.forEach((jobSites) => {
      counts[jobSites.status] = (counts[jobSites.status]) + 1;
    });
    
    setStatusCounts(counts);
  }, [jobSites]);
  return (
    <div className="container 3xl:max-width-[1920px] mx-auto h-screen p-2.5 flex flex-col gap-5">
        <StatusOverview counts={statusCounts}/>
        <JobSiteTable jobSites={jobSites}/>        
    </div>
  )
}

export default Dashboard