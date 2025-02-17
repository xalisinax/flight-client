import { useEffect, useState } from "react";
import { FlightDto } from "@/models";
import { FlightService } from "@/services";
import { Table } from "@/components";
import { FaBook, FaTrash } from "react-icons/fa6";
import { DialogType, DialogUtil } from "@/utils";

export function Grid() {
  const [data, setData] = useState<FlightDto[]>([]);
  const reserve = (id: string) => {
    DialogUtil.prompt(
      "Choose seat",
      "Please enter the seat column and row in alphabetic and nemuric order",
      "Reserve",
      "Cancel",
      (seat: string) => {
        FlightService.reserve(id, seat)
          .then(() => DialogUtil.alert("Reserved!", DialogType.succuss))
          .catch((error) =>
            DialogUtil.alert(error.response?.data?.detail, DialogType.error)
          );
      },
      () => {}
    );
  };

  const unreserve = (id: string) => {
    DialogUtil.confirm(
      "Unreserve booking",
      "You are about to unreserve your booking.Are you sure?",
      "Yes",
      "No",
      () => {
        FlightService.unreserve(id)
          .then(() => DialogUtil.alert("Done!", DialogType.succuss))
          .catch((error) => {
            DialogUtil.alert(error.response?.data?.detail, DialogType.error);
          });
      },
      () => {}
    );
  };
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Origin", accessor: "origin" },
    { label: "Destination", accessor: "destination" },
    { label: "Capacity", accessor: "capacity" },
    { label: "Flight Initiating", accessor: "takeOff" },
    { label: "Provider", accessor: "provider" },
    {
      label: "Operarions",
      render: (row: FlightDto) => (
        <div className="flex flex-row w-full justify-around items-center">
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => reserve(row.id)}
          >
            <FaBook />
          </span>
          <span
            className="text-red-600 cursor-pointer"
            onClick={() => unreserve(row.id)}
          >
            <FaTrash />
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    FlightService.get().then((result) => {
      setData(result);
    });
  }, []);

  return (
    <>
      <div className="p-6 w-full">
        <h1>All flights</h1>
        <Table data={data} columns={columns} />
      </div>
    </>
  );
}
