import React, { useState } from "react";
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

const Knowledge = () => {
  const [data, setData] = useState([
    {
      date: { $date: "2025-07-25T00:00:00.000Z" },
      category: "Intelligence Series",
      venue: null,
      city: "Lucknow",
      name: "iDAC Intelligence Series – Lucknow",
      _id: { $oid: "68262485f18855c4da9182c3" },
    },
    {
      date: { $date: "2025-08-10T00:00:00.000Z" },
      category: "iDAC Expo",
      venue: "Bombay Exhibition Centre",
      city: "Mumbai",
      name: "iDAC Expo – Mumbai",
      _id: { $oid: "68262485f18855c4da9182c4" },
    },
    {
      date: { $date: "2025-09-05T00:00:00.000Z" },
      category: "Intelligence Series",
      venue: null,
      city: "Jaipur",
      name: "iDAC Intelligence Series – Jaipur",
      _id: { $oid: "68262485f18855c4da9182c5" },
    },
    {
      date: { $date: "2025-10-15T00:00:00.000Z" },
      category: "iDAC Expo",
      venue: "Pragati Maidan",
      city: "Delhi",
      name: "iDAC Expo – Delhi",
      _id: { $oid: "68262485f18855c4da9182c6" },
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    category: "",
    date: { $date: "" },
    city: "",
    venue: "",
  });

  const category = ["Intelligence Series", "iDAC Expo"];

  const handleDateChange = (e) => {
    const isoString = new Date(e.value).toISOString();
    setEvent({ ...event, date: { $date: isoString } });
  };

  const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" severity="danger" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-save" severity="info" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

  const navigate = useNavigate();

  const deleteButtonTemplate = (rowData) => (
    <div>
      <Button
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={(e) => {}}
      />
    </div>
  );

  return (
    <div className="my-10">
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
              onRowClick={(e) => navigate(`/events/${e.data._id.$oid}`)}
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
                field="date.$date"
                header="Date"
                body={(rowData) =>
                  new Date(rowData.date.$date).toLocaleDateString()
                }
                style={{ width: "20%" }}
                sortable
              />
              <Column
                body={deleteButtonTemplate}
                header="Actions"
                style={{ width: "10%", textAlign: "center" }}
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
              value={event.venue}
              placeholder="Set of the Event"
              onChange={(e) => setEvent({ ...event, venue: e.value })}
            />
          </div>
          <div className="space-y-3 my-3">
            <div>Category</div>
            <Dropdown
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.value })}
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
                value={new Date(event.date.$date)} // correct value source & type
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
                onChange={(e) => setEvent({ ...event, city: e.value })}
              />
            </div>
          </div>
          <div className="space-y-3 my-3 w-full">
            <div>Venue</div>
            <InputTextarea
              className="w-full"
              value={event.venue}
              placeholder="Set Venue"
              onChange={(e) => setEvent({ ...event, venue: e.value })}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Knowledge;
