// TODO: Complete DatePicker

import React, { useState } from "react";
import PickDate from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { MdOutlineDateRange } from "react-icons/md";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [dateVisibility, setDateVisibility] = useState(false);
  return (
    <div>
      <div className="flex items-center">
        <button
          className={"h-10 rounded-full text-3xl opacity-60 "}
          onClick={() => {
            setDateVisibility(!dateVisibility);
          }}
        >
          <MdOutlineDateRange />
        </button>
        {/* {dateVisibility && (
          <PickDate selected={date} onChange={(date) => setDate(date)} />
        )} */}
      </div>
    </div>
  );
};

export default DatePicker;
