import { BreadCrumb } from "primereact/breadcrumb";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import TextCard from "../components/ui/TextCard";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import EditEvent from "../components/events/EditEvent";
import { deleteEvent, getEventById } from "../api_utils/api_routes";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Event = () => {
  const { id } = useParams();
  const toast = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const toggleSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Updated Successfully",
      detail: "Event details updated successfully.",
      life: 3000,
    });
  };

  const toggleError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Occured",
      detail: "Error occured while updating event.",
      life: 3000,
    });
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getEventById(id);
      console.log(res);
      setData(res);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error occured while fetching event details. Please Refresh",
        life: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const items = [
    {
      label: id,
    },
  ];
  const home = {
    label: "All Events",
    command: () => {
      navigate("/events");
    },
  };

  const handleDelete = async () => {
    setDelLoading(true);
    try {
      await deleteEvent(id);
      navigate("/events");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error occured while deleting event. Please Refresh",
        life: 3000,
      });
    }
    setDelLoading(false);
  };

  const accept = () => {
    handleDelete();
  };

  const reject = () => {};

  const deleteConfirm = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
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
                        loading={delLoading}
                        onClick={deleteConfirm}
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
                          value={new Date(data?.date).toLocaleDateString("en-GB")}
                        />
                        <TextCard title={"City"} value={data.city} />
                      </div>
                      <TextCard title={"Venue"} value={data.venue || "N/A"} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EditEvent
                data={data}
                toggleEdit={toggleEdit}
                id={id}
                toggleError={toggleError}
                toggleSuccess={toggleSuccess}
                fetchData={fetchData}
              />
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
