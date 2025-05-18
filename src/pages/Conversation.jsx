import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";

const Conversation = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "InputText",
      template: () => (
        <Link href="/inputtext">
          <a className="text-primary font-semibold">Pratham</a>
        </Link>
      ),
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
        <BreadCrumb model={items} home={home} style={{background:"transparent", border:"None"}}/>
      </div>
      <div className="my-5">
        <div className="text-3xl">All Contacts</div>

      </div>
    </div>
  );
};

export default Conversation;
