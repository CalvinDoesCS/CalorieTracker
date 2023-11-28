import { HStack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCalorieDateStore from "./store";

const DateDropDown = () => {
  const calorieDateStore = useCalorieDateStore();
  return (
    <HStack>
      <DatePicker
        showIcon
        closeOnScroll={true}
        selected={calorieDateStore.selectedDate}
        onChange={(date: Date) => calorieDateStore.setSelectedDate(date)}
        maxDate={new Date()}
      />
    </HStack>
  );
};

export default DateDropDown;
