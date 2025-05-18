import React, { useEffect, useRef, useState } from "react";
import StatsCard from "../components/ui/StatsCard";
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';

const Home = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const showWarn = () => {
        toast.current.show({severity:'error', summary: 'Error Occured', detail:alert , life: 3000});
    }
 

  return (
    <div className="w-full my-10">
      <Toast ref={toast} />
      { loading ? (
        <div className="grid grid-cols-4 w-full gap-5">
          <Skeleton height="120px" width="100%" borderRadius="10px"/>
          <Skeleton height="120px" width="100%" borderRadius="10px"/>
          <Skeleton height="120px" width="100%" borderRadius="10px"/>
          <Skeleton height="120px" width="100%" borderRadius="10px"/>
        </div>
      ) : (
        <div className="grid grid-cols-4 w-full gap-5">
        <StatsCard 
          title={"Total Messages"}
          value={"3000"}
          icon={"inbox"}
        />
        <StatsCard 
          title={"Total Messages"}
          value={"3000"}
          icon={"inbox"}
        />
        <StatsCard 
          title={"Total Messages"}
          value={"3000"}
          icon={"inbox"}
        />
        <StatsCard 
          title={"Total Messages"}
          value={"3000"}
          icon={"inbox"}
        />
        <StatsCard 
          title={"Total Messages"}
          value={"3000"}
          icon={"inbox"}
        />
        <StatsCard 
          title={"Total Messages"}
          value={"3000"}
          icon={"inbox"}
        />
      </div>
      )}
    </div>
  );
};

export default Home;
