import { BreadCrumb } from "primereact/breadcrumb";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import TextCard from "../components/ui/TextCard";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { getUserById } from "../api_utils/api_routes";
import ChatHistory from "../components/ui/ChatHistory";

const Person = () => {
  const { id } = useParams();
  const toast = useRef(null);
  const navigate = useNavigate();
  const items = [
    {
      label: id,
    },
  ];
  const home = {
    label: "All",
    command: () => {
      navigate("/conversation");
    },
  };

  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getUserById(id);
      setData(res)
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error occured while fetching user details. Please Refresh",
        life: 3000,
      });
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Toast ref={toast} />
      <div className="">
        <BreadCrumb
          model={items}
          home={home}
          style={{ background: "transparent", border: "None" }}
        />
      </div>
      <div className="my-5 h-full px-5">
        {loading ? (
          <div className="my-5 h-full space-y-5">
            <Skeleton height="100px" width="100%" borderRadius="10px" />
            <Skeleton height="100px" width="100%" borderRadius="10px" />
          </div>
        ) : data ? (
          <div>
            <div className="text-3xl">{data.username}</div>
            <Divider />
            <div className="flex flex-col lg:flex-row w-full h-full gap-5">
              <div className="w-full lg:w-[50%]">
                <TextCard title={"Phone number"} value={data.phone_number} />
                <div className="flex gap-6">
                  <TextCard title={"Last Active"} value={new Date(data?.updated_at?.$date).toLocaleString()} />
                  <TextCard title={"Created At"} value={new Date(data?.updated_at?.$date).toLocaleString()} />
                </div>
                <TextCard
                  title={"Last Service Selected"}
                  value={data.service_selected || "None"}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm my-2">Chat History</div>
                <div className="border bg-gray-900 border-gray-800 w-full h-[410px] my-3 overflow-auto">
                  <ChatHistory 
                    messages={data.chat_history}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default Person;
