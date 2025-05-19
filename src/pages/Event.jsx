import { BreadCrumb } from "primereact/breadcrumb";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import TextCard from "../components/ui/TextCard";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import EditEvent from "../components/events/EditEvent";


const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    date: { $date: "2025-07-25T00:00:00.000Z" },
    category: "Intelligence Series",
    venue: null,
    city: "Lucknow",
    name: "iDAC Intelligence Series – Lucknow",
    _id: { $oid: "68262485f18855c4da9182c3" },
  });
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const items = [
    {
      label: id,
    },
  ];
  const home = {
    label: "All Events",
    command: () => {
      navigate("/knowledge");
    },
  };

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
            {!isEdit ? (
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{data.name}</div>
                  <div className="card flex justify-content-center">
                    <div className="flex items-center gap-5">
                      <Button
                        label="Edit"
                        icon="pi pi-pencil"
                        severity="info"
                        onClick={toggleEdit}
                      />
                      <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                      />
                    </div>
                  </div>
                </div>

                <Divider />
                <div className="flex flex-col lg:flex-row w-full h-full gap-5">
                  <div className="w-full lg:w-[50%]">
                    <div>
                      <TextCard title={"Category"} value={data.category} />
                      <div className="flex gap-6">
                        <TextCard
                          title={"Date"}
                          value={new Date(data.date.$date).toLocaleDateString()}
                        />
                        <TextCard title={"City"} value={data.city} />
                      </div>
                      <TextCard title={"Venue"} value={data.venue || "N/A"} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EditEvent data={data} toggleEdit={toggleEdit}/>
            )}
          </div>
        ) : (
          <div className="text-gray-400">No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default Event;
