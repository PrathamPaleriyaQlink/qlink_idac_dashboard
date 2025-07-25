import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { addEvent, getEvents, handleAuthError } from "../api_utils/api_routes";
import { Toast } from "primereact/toast";

const Knowledge = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    category: "",
    date: new Date().toISOString(),
    city: "",
    venue: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvents();
      setData(eventsData);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error occured while listing all the events. Please Refresh",
        life: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const category = ["Intelligence Series", "iDAC Expo"];

  const handleDateChange = (e) => {
    const utcISOString = e.value.toISOString();
    setEvent({ ...event, date: utcISOString });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { name, category, city, date } = event;
    if (!name || !category || !city || !date) {
      toast.current.show({
        severity: "error",
        summary: "Invalid Request",
        detail: "Fill all the details",
        life: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      const original = new Date(event.date);
      const utcMidnight = new Date(
        Date.UTC(
          original.getFullYear(),
          original.getMonth(),
          original.getDate(),
          0,
          0,
          0
        )
      );
      const isoString = utcMidnight.toISOString();
      await addEvent({
        ...event,
        date: isoString,
      });
      await fetchData();
      setVisible(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error occured while adding the events. Please Refresh",
        life: 3000,
      });
    } finally {
      setEvent({
        name: "",
        category: "",
        date: new Date().toISOString(),
        city: "",
        venue: "",
      });
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="danger"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Save"
        loading={loading}
        icon="pi pi-save"
        severity="info"
        onClick={handleSave}
        autoFocus
      />
    </div>
  );

  return (
    <div className="my-10">
      <Toast ref={toast} />
      <div className="w-full flex items-center justify-between">
        <div className="text-3xl">All Events</div>
        <Button
          label="Add Event"
          icon="pi pi-plus"
          severity="info"
          onClick={() => setVisible(true)}
        />
      </div>

      {loading ? (
        <div className="my-5 h-full">
          <Skeleton height="400px" width="100%" borderRadius="10px" />
        </div>
      ) : (
        <div className="my-5 h-full">
          {data.length > 0 ? (
            <DataTable
              onRowClick={(e) => navigate(`/events/${e.data._id}`)}
              value={data}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              tableStyle={{ minWidth: "100%", minHeight: "300px" }}
              className="cursor-pointer custom-datatable"
            >
              <Column
                field="name"
                header="Event Name"
                style={{ width: "25%" }}
              />
              <Column
                field="category"
                header="Category"
                filter
                style={{ width: "20%" }}
                sortable
              />
              <Column
                field="city"
                header="City"
                filter
                style={{ width: "15%" }}
                sortable
              />
              <Column
                field="date"
                header="Date"
                body={(rowData) =>
                  new Date(rowData.date).toLocaleDateString("en-GB")
                }
                style={{ width: "20%" }}
                sortable
              />
            </DataTable>
          ) : (
            <div className="text-gray-400">No Data Available</div>
          )}
        </div>
      )}
      <Dialog
        header="Add New Event"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
        position="center"
      >
        <div>
          <div className="space-y-3 my-5 w-full">
            <div>Name</div>
            <InputText
              className="w-full"
              type="text"
              value={event.name}
              placeholder="Set of the Event"
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
            />
          </div>
          <div className="space-y-3 my-3">
            <div>Category</div>
            <Dropdown
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
              editable
              options={category.map((c) => c)}
              placeholder="Select a Category"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="flex gap-6">
            <div className="space-y-3 my-3 w-full">
              <div>Date</div>
              <Calendar
                placeholder="Select Date"
                value={new Date(event.date)} // correct value source & type
                onChange={handleDateChange}
                dateFormat="dd/mm/yy"
                className="w-full"
              />
            </div>
            <div className="space-y-3 my-3 w-full">
              <div>City</div>
              <InputText
                className="w-full"
                value={event.city}
                placeholder="Set City"
                onChange={(e) => setEvent({ ...event, city: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3 my-3 w-full">
            <div>Venue</div>
            <InputTextarea
              className="w-full"
              value={event.venue}
              placeholder="Set Venue"
              defaultValue={"N/A"}
              onChange={(e) => setEvent({ ...event, venue: e.target.value })}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Knowledge;
