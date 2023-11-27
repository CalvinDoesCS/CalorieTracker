import { CalendarIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DateDropDown = ({ selectedDate, setSelectedDate }: Props) => {
  return (
    <HStack>
      <DatePicker
        showIcon
        closeOnScroll={true}
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        maxDate={new Date()}
      />
    </HStack>
  );
};

export default DateDropDown;
