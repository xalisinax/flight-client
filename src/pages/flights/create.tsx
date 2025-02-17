import { useForm } from "react-hook-form";
import { CreateFlightRequest } from "@/models";
import { DateField, InputField } from "@/components";
import { FlightService } from "@/services";
import { DialogUtil } from "@/utils";
interface Props {
  onSave: () => void;
}
export function Create({ onSave }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateFlightRequest>();

  const create = (model: CreateFlightRequest) => {
    FlightService.create(model)
      .then((result) => {
        DialogUtil.alert(`Created with id ${result}`);
        onSave();
      })
      .catch((error) => {
        if (error.status === 400)
          Object.keys(error.response.data).forEach((field) => {
            setError(field as keyof CreateFlightRequest, {
              type: "server",
              message: error.response.data[field],
            });
          });
      });
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create New Flight
        </h2>

        <form onSubmit={handleSubmit(create)}>
          <InputField
            label="Capacity"
            type="number"
            register={register("capacity")}
            error={errors.capacity}
          />

          <InputField
            label="Origin"
            type="text"
            register={register("origin")}
            error={errors.origin}
          />

          <InputField
            label="Destination"
            type="text"
            register={register("destination")}
            error={errors.destination}
          />

          <InputField
            label="Provider"
            type="text"
            register={register("provider")}
            error={errors.provider}
          />

          <DateField
            label="Take Off Date"
            register={register("takeOffAt")}
            error={errors.takeOffAt}
          />

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
