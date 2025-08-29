import { useParams } from "react-router-dom";
import CoreScaffoldImage from "../assets/svg/ItemGrid/CoreScaffold.svg";
import { getJobSiteCategoriesById } from "../api/JobSites";
import BackArrow from "../assets/svg/ItemGrid/BackArrow.svg";
import { useEffect, useState } from "react";
import type { JobSiteCategory } from "../types/JobSiteCategory";
import type { JobSiteItem } from "../types/JobSiteItem";
import { getItems } from "../api/Items";
function JobSite() {
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<JobSiteCategory[]>([]);
  const [items, setItems] = useState<JobSiteItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobSiteCategoriesById(id);

        setCategories(data.data);
      } catch (err) {
        console.error("Failed to load job site categories:", err);
      }
    }

    fetchData();
  }, []);

  const getItemsByCategoryId = async (categoryId: number) => {
    const response = await getItems(categoryId);

    setItems(response.data);
  };
  return (
    <div className="container 3xl:max-width-[1920px] mx-auto h-screen p-2.5 grid grid-cols-[20%_1fr] bg-white  gap-2.5">
      <div className="h-[500px]  grid grid-rows-[45px_1fr] gap-2.5 rounded-[10px] shadow overflow-hidden">
        <div className="w-full px-5 flex items-center bg-[#F8F8FA]">
          <p className="openSans font-semibold text-[#323338]">
            262 3rd Avenue, New York
          </p>
        </div>
        <div className="w-full flex flex-col bg-white px-2.5  justify-between">
          <div className="w-full flex flex-col gap-2.5">
            {categories.map((category) => (
              <div
                key={category.id}
                className="w-full h-[32px] flex justify-center items-center bg-[#F8F8FA] rounded-[5px] cursor-pointer"
                onClick={() => getItemsByCategoryId(category.id)}
              >
                <p>{category.category.name}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-[32px] flex justify-center items-center">
            <div className="w-[150px] h-full flex bg-[#1264A3] rounded-[5px] mb-5">
              <div className="w-[80%] h-full border-r border-[#0F5C97] flex items-center justify-center">
                <p className="text-[14px] text-white">Go Back</p>
              </div>
              <div className="w-[20%] h-full flex justify-center items-center">
                <img src={BackArrow} className="max-w-[17px]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[500px]  grid grid-rows-[45px_1fr] gap-2.5 rounded-[10px] shadow overflow-hidden">
        <div className="w-full px-5 flex items-center bg-[#F8F8FA]">
          <p className="openSans font-semibold text-[#323338]">Data Grid</p>
        </div>
        {items.length === 0 ? (
          <div className="w-full bg-white flex justify-center items-center flex-col gap-2.5">
            <img src={CoreScaffoldImage} className="max-w-[190px]" alt="" />
            <div className="flex flex-col items-center gap-[2px]">
              <p className="openSans font-semibold">No Service Selected</p>
              <p className="openSans">
                Please select a service on your left to proceed.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8f8fa] text-left">
                  <th className="p-2 openSans">ID</th>
                  <th className="p-2 openSans">Item Name</th>
                  <th className="p-2 openSans">Quantity</th>
                  <th className="p-2 openSans">Description</th>
                  <th className="p-2 openSans">Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-[#f8f8fa]"}`}
                  >
                    <td className="p-2 openSans">{item.id}</td>
                    <td className="p-2 openSans">{item.item.name}</td>
                    <td className="p-2 openSans">{item.quantity}</td>
                    <td className="p-2 openSans">{item.description}</td>
                    <td className="p-2 openSans">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}  
      </div>
    </div>
  );
}

export default JobSite;
