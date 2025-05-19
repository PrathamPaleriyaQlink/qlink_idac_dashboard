import { BreadCrumb } from "primereact/breadcrumb";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  return (
    <div>
      <div className="">
        <BreadCrumb
          model={items}
          home={home}
          style={{ background: "transparent", border: "None" }}
        />
      </div>
    </div>
  );
};

export default Person;
