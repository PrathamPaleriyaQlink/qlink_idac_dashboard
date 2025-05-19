import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Conversation = () => {
  const [data, setData] = useState([
    { name: "Aarav Mehta", lastActive: "2025-05-18", interactions: 42 },
    { name: "Isha Sharma", lastActive: "2025-05-17", interactions: 18 },
    { name: "Kabir Verma", lastActive: "2025-05-15", interactions: 27 },
    { name: "Tanya Roy", lastActive: "2025-05-19", interactions: 56 },
    { name: "Rahul Bansal", lastActive: "2025-05-16", interactions: 33 },
    { name: "Diya Nair", lastActive: "2025-05-14", interactions: 12 },
    { name: "Vedant Kapoor", lastActive: "2025-05-19", interactions: 61 },
    { name: "Meera Joshi", lastActive: "2025-05-18", interactions: 25 },
    { name: "Ananya Desai", lastActive: "2025-05-12", interactions: 9 },
    { name: "Rohan Iyer", lastActive: "2025-05-13", interactions: 44 },
    { name: "Saanvi Malhotra", lastActive: "2025-05-17", interactions: 38 },
    { name: "Yash Tiwari", lastActive: "2025-05-15", interactions: 20 },
    { name: "Nikita Agarwal", lastActive: "2025-05-11", interactions: 7 },
    { name: "Arjun Pillai", lastActive: "2025-05-18", interactions: 50 },
    { name: "Sneha Reddy", lastActive: "2025-05-10", interactions: 13 },
    { name: "Manav Singh", lastActive: "2025-05-16", interactions: 31 },
    { name: "Ira Bhattacharya", lastActive: "2025-05-13", interactions: 21 },
    { name: "Dev Patel", lastActive: "2025-05-19", interactions: 63 },
    { name: "Ritika Saxena", lastActive: "2025-05-14", interactions: 16 },
    { name: "Aditya Rao", lastActive: "2025-05-12", interactions: 28 },
  ]);

  const navigate = useNavigate();
  const items = [
    {
      label: "InputText",
    },
  ];
  const home = {
    label: "All",
    command: () => {
      navigate("/conversation");
    },
  };

  return (
    <div className="my-10">
      <div className="">
        <div className="text-3xl">All Contacts</div>
        <div className="my-5 h-full">
          {data.length > 0 ? (
            <DataTable
              onRowClick={(e) => navigate(`/people/${e.data.name}`)}
              value={data}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              tableStyle={{ minWidth: "100%" }}
              className="cursor-pointer custom-datatable"
            >
              <Column
                field="name"
                header="Name"
                style={{ width: "33.33%" }}
              ></Column>
              <Column
                field="lastActive"
                sortable
                header="Last Active"
                style={{ width: "33.33%" }}
              ></Column>
              <Column
                field="interactions"
                header="Interactions"
                sortable
                style={{ width: "33.33" }}
              ></Column>
            </DataTable>
          ) : (
            <div className="text-gray-400">No Data Available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
