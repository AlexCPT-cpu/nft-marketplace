"use client";

import { useEffect } from "react";

interface DatePickerProps {
  value: Date;
  onChange: (value: any) => void;
  title: string;
  start?: Date;
  end?: Date;
  error?: boolean;
  setError: (state: boolean) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  title,
  start,
  end,
  error,
  setError,
}) => {
  useEffect(() => {
    if (title === "Start Date") {
      let current = new Date();
      let selected = new Date(value);

      current.getTime() <= selected.getTime()
        ? console.log("Valid start")
        : setError(true);
    }
  }, [value, title, setError]);

  useEffect(() => {
    if (title === "End Date") {
      let startDate = new Date(start!);
      let selected = new Date(value);
      console.log();

      selected?.getTime() > startDate?.getTime()!
        ? console.log("Valid End")
        : setError(true);
    }
  }, [start, title, value, setError]);

  return (
    <div className="mt-4 flex mx-auto justify-center whitespace-nowrap flex-col text-center">
      <h3 className="py-2">{title}</h3>
      <input
        className="text-black dark:text-dark border border-blue-400/20 p-2 rounded-lg"
        onChange={(e) => onChange(e.currentTarget.value)}
        type="datetime-local"
      />
    </div>
  );
};

export default DatePicker;
