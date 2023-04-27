import { DatePicker, Radio, Space, Typography } from "antd";
import React from "react";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const { Text } = Typography;

export default function Filter({ state }) {
  const { filter } = useSnapshot(state);

  const handleChange = (e) => {
    state.filter = e.target.value;
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      state.filteredStartDate = dates[0].format("YYYY-MM-DD");
      state.filteredEndDate = dates[1].format("YYYY-MM-DD");
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
    <Space style={{ float: "left", marginTop: 30, marginBottom: 10 }}>
      <Text>Filter:</Text>
      <Radio.Group onChange={handleChange} defaultValue={filter}>
        <Radio.Button value="all" onChange={handleChange}>
          All
        </Radio.Button>
        <Radio.Button value="not_done" onChange={handleChange}>
          Not Done
        </Radio.Button>
        <Radio.Button value="done" onChange={handleChange}>
          Done
        </Radio.Button>
      </Radio.Group>
      <RangePicker presets={rangePresets} onChange={onRangeChange} />
    </Space>
  );
}
