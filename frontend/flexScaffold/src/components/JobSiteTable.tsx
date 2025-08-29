import info from "../assets/svg/table/info.svg";
import SearchInput from "./SearchInput";
import JobSiteTableData from "./JobSiteTableData";
import type { JobSite } from "../types/JobSiteType";
import { useOverlay } from "../context/OverlayContext";
import { useState } from "react";
function JobSiteTable({ jobSites }: { jobSites?: JobSite[] }) {
  const { show, hide } = useOverlay();
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [status, setStatus] = useState<number | "">("");
  const categories = [
  { id: 1, name: "Category A" },
  { id: 2, name: "Category B" },
  { id: 3, name: "Category C" },
];

const statuses = [
  { value: 0, label: "On Road" },
  { value: 1, label: "Completed" },
  { value: 2, label: "On Hold" },
];

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  
  const openModal = () => {
    show(
      <div className="w-[868px] h-[388px] rounded-[10px] bg-white grid grid-rows-[45px_1fr] overflow-hidden">
        <div className="w-full  bg-[#F8F8FA] flex justify-between px-5 items-center">
          <p className="font-semibold text-[16px]">Title</p>
          <p className="cursor-pointer text-[#323338] font-bold" onClick={hide}>
            x
          </p>
        </div>
        <div className="w-full p-5 flex flex-col justify-between">
          <div className="w-full h-auto flex gap-2.5">
            <img src={info} className="max-w-[20px]" alt="" />
            <p className="text-[#323338] text-[14px]">
              Informative piece of text that can be used regarding this modal.
            </p>
          </div>
          <form className="space-y-4">
            <div className="flex flex-col w-full">
              <label className="font-semibold mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter name"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-7/12">
                <label className="font-semibold mb-1">Category Included</label>
                <div className="border rounded px-3 py-2 flex flex-col gap-1 max-h-40 overflow-auto">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="accent-blue-500"
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-5/12">
                <label className="font-semibold mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select status</option>
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col rounded-[10px] overflow-hidden bg-white">
      <div className="h-[45px] bg-[#F8F8FA] px-5 py-3">
        <p>Title</p>
      </div>
      <div className="flex justify-between px-5 h-[52px] items-center">
        <div className="flex gap-2.5">
          <img src={info} alt="info" className="max-w-[20px] max-h-[20px]" />
          <p className="openSans text-[14px] font-normal text-[#323338]">
            Informative piece of text that can be used regarding this modal.
          </p>
        </div>
        <div className="flex gap-5 py-5">
          <SearchInput />
          <div
            className="w-[150px] bg-[#71CF48] rounded-[5px] flex hover:bg-[#68C142] cursor-pointer"
            onClick={openModal}
          >
            <div className="w-[80%] h-full border-r border-[#68C142] flex justify-center items-center  ">
              <p className="openSans text-white ">Create</p>
            </div>
            <div className="w-[20%] h-full flex justify-center items-center">
              <p className="openSans text-white font-bold text-2xl">+</p>
            </div>
          </div>
        </div>
      </div>

      <JobSiteTableData jobSites={jobSites} />
    </div>
  );
}

export default JobSiteTable;
