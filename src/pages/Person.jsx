import { BreadCrumb } from "primereact/breadcrumb";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import TextCard from "../components/ui/TextCard";
import { Skeleton } from "primereact/skeleton";

const Person = () => {
  const { id } = useParams();
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
  const [alert, setAlert] = useState(null);

  return (
    <div>
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
            <div className="text-3xl">{id}</div>
            <Divider />
            <div className="flex flex-col lg:flex-row w-full h-full gap-5">
              <div className="w-full lg:w-[50%]">
                <TextCard title={"Phone number"} value={"91843526362"} />
                <div className="flex gap-6">
                  <TextCard title={"Last Active"} value={"91843526362"} />
                  <TextCard title={"Created At"} value={"91843526362"} />
                </div>
                <TextCard
                  title={"Last Service Selected"}
                  value={"sent_book_spot_flow"}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm my-2">Chat History</div>
                <div className="bg-gray-800 border p-5 border-black w-full h-[410px] rounded-xl my-3 overflow-auto">
                  this is a test
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
