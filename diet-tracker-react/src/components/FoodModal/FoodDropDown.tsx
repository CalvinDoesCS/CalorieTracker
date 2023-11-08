
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useFoods } from "../../hooks/FoodHooks";
import Food from "../../entities/Food";
import { useState } from "react";
interface Props{
  onSubmit: (food : Food) => void
  onClose: () => void
  formId: string;
}

const FoodDropDown = ({onSubmit,onClose,formId} : Props) => {
  const { data, error, isLoading } = useFoods();
  const [selectedFood, setSelectedFood] = useState<Food>();
  type GroupedOption = {
    label: string;
    options: { value: number; label: string }[];
  };
  
  const groupedOptions: GroupedOption[] = [];

  data?.forEach(item => {
      const existingGroup = groupedOptions.find(group => group.label === item.category);
  
      if (existingGroup) {
          existingGroup.options.push({value:item.id, label:item.name+" ("+item.calories+" cal)"});
      } else {
          groupedOptions.push({ label: item.category, options: [{value:item.id, label:item.name+" ("+item.calories+" cal)"}] });
      }
  })  
  const handleFoodChange = (selectedOption : any) => {
    const food = data?.find(food => food.id === selectedOption.value);
    if (food) {
      setSelectedFood(food);
    } 
  }
  return (
    <form
    onSubmit={(event) => {
      event.preventDefault();
      if(selectedFood){
        onSubmit(selectedFood);
        onClose();
      }else{
        console.log("Invalid Selection")
      }
    }}
    id={formId}
  >
      <FormControl p={4}>
        <FormLabel> 
          Food Options
        </FormLabel>
        <Select
          useBasicStyles
          name="colors"
          selectedOptionStyle="check"
          options={groupedOptions}
          placeholder="Select Food Options"
          closeMenuOnSelect={true}
          onChange={handleFoodChange}
        />
      </FormControl>
    </form>
  )
}

export default FoodDropDown