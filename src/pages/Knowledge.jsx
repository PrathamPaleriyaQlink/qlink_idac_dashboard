import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";

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
  const [delLoading, setDelLoading] = useState(false)
  const navigate = useNavigate();

  

  const deleteButtonTemplate = (rowData) => (

    <div>
      <Button
      icon="pi pi-trash"
      className="p-button-danger p-button-sm"
      onClick={(e) => {
        
      }}
    />
    </div>
    
  );

  

  return (
    <div className="my-10">
      <div className="text-3xl">All Events</div>
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
    </div>
  );
};

export default Knowledge;
