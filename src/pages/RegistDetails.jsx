import { BreadCrumb } from "primereact/breadcrumb";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import TextCard from "../components/ui/TextCard";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import EditEvent from "../components/events/EditEvent";
import { Tag } from 'primereact/tag';
import {
  deleteEvent,
  getEventById,
  getRegistrations,
  getRegistrationsById,
} from "../api_utils/api_routes";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const RegistDetails = () => {
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
      const res = await getRegistrationsById(id);
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
    label: "All Registrations",
    command: () => {
      navigate("/registrations");
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

  const getFieldsByType = (type, data) => {
    const fields = {
      event: [
        { title: "Event Name", value: data.event_name },
        { title: "Name", value: data.name },
        { title: "Company", value: data.company_name },
        { title: "Designation", value: data.designation },
        { title: "Profession", value: data.profession },
        { title: "City", value: data.city },
        { title: "Email", value: data.email },
        { title: "Phone", value: data.phone_number },
      ],
      speaker: [
        { title: "Name", value: data.name },
        { title: "Email", value: data.email },
        { title: "Organization", value: data.organization_company },
        { title: "Designation", value: data.designation_title },
        { title: "Presentation Topic", value: data.presentation_topic },
        { title: "Topic Description", value: data.topic_description },
        { title: "Industry Category", value: data.industry_category },
        { title: "Presented Before", value: data.has_presented_before },
        { title: "Previous Conference", value: data.previous_conference_name },
        { title: "Profile URL", value: data.profile_url },
        { title: "Phone", value: data.phone_number },
      ],
      exhibitor: [
        { title: "Name", value: data.name },
        { title: "Brand", value: data.brand_name },
        { title: "Email", value: data.email },
        { title: "Phone", value: data.phone_number },
      ],
    };

    return fields[type] || [];
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
            <div>
              <div className="flex items-center justify-between">
                <div className="text-3xl">{data.name}</div>
                <div className="flex gap-5">
                    <div className="px-10 py-2 text-lg bg-cyan-900 rounded-full">{data.source}</div>
                    <div className="px-10 py-2 text-lg bg-blue-900 rounded-full">{data.type}</div>
                </div>
              </div>

              <Divider />

              <div >
                <div className="grid grid-cols-2 gap-5">
                  {getFieldsByType(data.type, data).map((field, idx) => (
                    <TextCard
                      key={idx}
                      title={field.title}
                      value={field.value || "N/A"}
                    />
                  ))}
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

export default RegistDetails;
