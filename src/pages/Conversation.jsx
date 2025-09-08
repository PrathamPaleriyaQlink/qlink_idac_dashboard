import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { getUsers, handleAuthError } from "../api_utils/api_routes";
import { Toast } from "primereact/toast";

const Conversation = () => {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [source, setSource] = useState("idac");

  const fetchData = async () => {
    setLoading(true);
    try {
      const users = await getUsers(source);
      setData(users);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error occured while listing all the users. Please Refresh",
        life: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [source])

  return (
    <div className="my-10">
      <Toast ref={toast} />
      <div className="w-full flex items-center justify-between">
        <div className="text-3xl">
          {`All Conversations - ( ${source} )`}
        </div>
        <div>
            <button 
                className={`${source === "idac" ? "bg-blue-200 border-blue-200" : "bg-transparent text-white  border-blue-200"}  px-6 py-2 border text-black text-lg rounded-l-md transition-all cursor-pointer`}
                onClick={() => setSource("idac")}
            >iDAC</button>
            <button 
                className={`${source === "fsie" ? "bg-blue-200 border-blue-200" : "bg-transparent text-white  border-blue-200"}  px-6 py-2 border text-black text-lg rounded-r-md transition-all cursor-pointer`}
                onClick={() => setSource("fsie")}
            >FSIE</button>
        </div>
      </div>
      {loading ? (
        <div className="my-5 h-full">
          <Skeleton height="400px" width="100%" borderRadius="10px" />
        </div>
      ) : (
        <div className="my-5 h-full">
          {data.length > 0 ? (
            <DataTable
              onRowClick={(e) => navigate(`/people/${e.data._id}`)}
              value={data}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              tableStyle={{ minWidth: "100%" }}
              className="cursor-pointer custom-datatable"
            >
              <Column
                field="username"
                header="Name"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="phone_number"
                header="Phone Number"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="updated_at"
                header="Last Active"
                body={(rowData) =>
                  new Date(rowData.updated_at).toLocaleString()
                }
                style={{ width: "20%" }}
                sortable
              />
              <Column
                field="interactions"
                header="Interactions"
                sortable
                style={{ width: "25%" }}
              ></Column>
            </DataTable>
          ) : (
            <div className="text-gray-400">No Data Available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Conversation;
