import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import TextCard from "../ui/TextCard";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

const EditEvent = ({ data, toggleEdit }) => {
  const [editData, setEditData] = useState(data);
  const category = ["Intelligence Series", "iDAC Expo"];

  const handleDateChange = (e) => {
    const isoString = new Date(e.value).toISOString();
    setEditData({ ...editData, date: { $date: isoString } });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-3xl w-[50%]">
          <InputText
            className="w-full"
            value={editData.name}
            placeholder="Set Title"
            onChange={(e) => setEditData({ ...editData, name: e.value })}
          />
        </div>
        <div className="card flex justify-content-center">
          <div className="flex items-center gap-5">
            <Button
              label="Save"
              icon="pi pi-save"
              severity="info"
              onClick={toggleEdit}
            />
            <Button label="Cancel" icon="pi pi-times" severity="danger" />
          </div>
        </div>
      </div>

      <Divider />
      <div className="flex flex-col lg:flex-row w-full h-full gap-5">
        <div className="w-full lg:w-[50%]">
          <div>
            <div className="space-y-3 my-3">
              <div>Category</div>
              <Dropdown
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.value })
                }
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
                  value={new Date(editData.date.$date)} // correct value source & type
                  onChange={handleDateChange}
                  dateFormat="dd/mm/yy"
                  className="w-full"
                />
              </div>
              <div className="space-y-3 my-3 w-full">
                <div>City</div>
                <InputText
                  className="w-full"
                  value={editData.city}
                  placeholder="Set Title"
                  onChange={(e) => setEditData({ ...editData, city: e.value })}
                />
              </div>
            </div>
            <div className="space-y-3 my-3 w-full">
              <div>Venue</div>
              <InputTextarea
                className="w-full"
                value={editData.venue}
                placeholder="Set Venue"
                onChange={(e) => setEditData({ ...editData, venue: e.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
