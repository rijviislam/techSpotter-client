import { useState } from "react";
import { DateRange } from "react-date-range";
import { useForm } from "react-hook-form";

export default function ManageCoupons() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div>
      <h2 className="text-3xl">ManageCoupons</h2>
      <div>
        <form
          className=" mt-8 flex flex-col gap-3 w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="bg-white text-black h-12 px-3"
            type="number"
            {...register("couponCode", { required: true })}
          />
          <input
            className="bg-white text-black h-12 px-3"
            type="number"
            {...register("discountAmount", { required: true })}
          />
          <textarea
            className="bg-white text-black h-28 px-3 resize-none"
            {...register("couponCodeDescription", { required: true })}
          />
          <div className="flex justify-center">
            {/* Calender */}
            <DateRange
              showDateDisplay={false}
              rangeColors={["#F6536D"]}
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
          <input className="bg-blue-400 text-gray-600 p-3" type="submit" />
        </form>
      </div>
    </div>
  );
}
