import { useState, useEffect } from "react";
import SearchLogo from "../assets/svg/table/SearchLogo.svg";
import type { JobSite } from "../types/JobSiteType";


interface SearchInputProps {
  JobSiteList: JobSite[];
  setFilteredJobSites: (filtered: JobSite[]) => void;
}

export default function SearchInput({ JobSiteList, setFilteredJobSites }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter job sites whenever searchTerm changes
    const filtered = JobSiteList.filter((jobSite) =>
      jobSite.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobSites(filtered);
  }, [searchTerm, JobSiteList, setFilteredJobSites]);

  return (
    <div className="relative h-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
        <img src={SearchLogo} className="max-w-[15px] max-h-[15px]" alt="Search" />
      </div>

      <input
        type="text"
        placeholder="Search a job site"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-[35px] py-1.5 border border-[#EAEAEA] rounded-[5px]"
      />
    </div>
  );
}
