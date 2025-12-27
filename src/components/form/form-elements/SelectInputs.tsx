import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";

export default function SelectInputs() {
  const options = [
    { value: "toyota", label: "Toyota" },
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes-Benz" },
    { value: "audi", label: "Audi" },
    { value: "lexus", label: "Lexus" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const multiOptions = [
    { value: "1", text: "Замена масла", selected: false },
    { value: "2", text: "Диагностика", selected: false },
    { value: "3", text: "Замена тормозных колодок", selected: false },
    { value: "4", text: "Замена фильтров", selected: false },
    { value: "5", text: "Шиномонтаж", selected: false },
  ];
  return (
    <ComponentCard title="Выбор автомобиля и услуг">
      <div className="space-y-6">
        <div>
          <Label>Марка автомобиля</Label>
          <Select
            options={options}
            placeholder="Выберите марку"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <MultiSelect
            label="Необходимые работы"
            options={multiOptions}
            defaultSelected={["1", "3"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Выбранные услуги: {selectedValues.join(", ")}
          </p>
        </div>
      </div>
    </ComponentCard>
  );
}
