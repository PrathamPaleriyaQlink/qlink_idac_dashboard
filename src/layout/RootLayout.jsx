import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import React from "react";
import { Outlet, useNavigate, useRouteError } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Conversations",
      icon: "pi pi-whatsapp",
      command: () => {
        navigate("/conversation");
      },
    },
    {
      label: "Knowlegde",
      icon: "pi pi-book",
      command: () => {
        navigate("/knowledge");
      },
    },
  ];
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="px-8">
        <div className="flex items-center justify-between pt-7 pb-3">
          <div className="font-semibold text-3xl">iDAC Dashboard</div>
          <Button>Logout</Button>
        </div>
        <TabMenu model={items} />
      </div>

      <div className="overflow-auto px-8 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
