import { useEffect, useState } from "react";
import { FlightService } from "@/services";
import { Table } from "@/components";
import { FlightReservationDto } from "@/models";

export function Reservations() {
  const [data, setData] = useState<FlightReservationDto[]>([]);

  const columns = [
    { label: "Origin", accessor: "origin" },
    { label: "Destination", accessor: "destination" },
    { label: "Provider", accessor: "provider" },
    { label: "Seat", accessor: "seat" },
    { label: "Flight Initiating", accessor: "takeOffAt" },
  ];

  useEffect(() => {
    FlightService.mine().then((result) => {
      setData(result);
    });
  }, []);

  return (
    <>
      <div className="p-6 w-full">
        <h1>My Reservations</h1>
        <Table data={data} columns={columns} />
      </div>
    </>
  );
}
