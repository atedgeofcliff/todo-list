import { DatePicker, Radio, Space } from "antd";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

// import moment from "moment";

export default function Filter({ state }) {
  const { filter } = useSnapshot(state);
  // const [dateRange, changeDateRange] = useState(null);

  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    state.filter = e.target.value;
  };
  // console.log("filter", filter);

  // const onDateRangeChange = (dateRange) => {
  //   if (dateRange) {
  //     changeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
  //   } else {
  //     changeDateRange([]);
  //   }
  // };
  // const returnMomentDateRange = (start, finish) => {
  //   return [start, finish];
  // };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      state.filteredStartDate = dates[0].format("YYYY-MM-DD");
      state.filteredEndDate = dates[1].format("YYYY-MM-DD");
      // console.log("From: ", dates[0], ", to: ", dates[1]);
      // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      state.filteredStartDate = null;
      state.filteredEndDate = null;
    }
  };
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];
  return (
    <Space style={{ marginBottom: 16 }}>
      <Radio.Group onChange={handleChange} defaultValue={filter}>
        <Radio.Button
          value="all"
          /* checked={filter === "all"} */
          onChange={handleChange}
        >
          All
        </Radio.Button>
        <Radio.Button
          value="not_done"
          /* checked={filter === "not_done"} */
          onChange={handleChange}
        >
          Not Done
        </Radio.Button>
        <Radio.Button
          value="done"
          /* checked={filter === "done"} */
          onChange={handleChange}
        >
          Done
        </Radio.Button>
      </Radio.Group>
      <RangePicker presets={rangePresets} onChange={onRangeChange} />

      {/*  <RangePicker
        allowClear={true}
        size="small"
        picker="date"
        value={dateRange !== "" ? dateRange : ""}
        onChange={onDateRangeChange}

        // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
        // format={dateFormat}
      /> */}
    </Space>
  );
}
