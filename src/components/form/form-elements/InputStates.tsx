import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
export default function InputStates() {
  const [gosNumber, setGosNumber] = useState("");
  const [vin, setVin] = useState("");
  const [error, setError] = useState(false);

  // Validate Russian license plate format
  const validateGosNumber = (value: string) => {
    const isValid = /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/i.test(value);
    setError(!isValid && value.length > 0);
    return isValid;
  };

  const handleGosNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setGosNumber(value);
    validateGosNumber(value);
  };
  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setVin(value);
  };
  return (
    <ComponentCard
      title="Данные автомобиля"
      desc="Введите гос. номер и VIN-код автомобиля для идентификации."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label>Гос. номер</Label>
          <Input
            type="text"
            value={gosNumber}
            error={error}
            onChange={handleGosNumberChange}
            placeholder="А123ВС77"
            hint={error ? "Неверный формат гос. номера." : ""}
          />
        </div>

        {/* Success Input */}
        <div>
          <Label>VIN-код</Label>
          <Input
            type="text"
            value={vin}
            success={vin.length === 17}
            onChange={handleVinChange}
            placeholder="Введите 17-значный VIN"
            hint={vin.length === 17 ? "VIN-код корректный." : ""}
          />
        </div>

        {/* Disabled Input */}
        <div>
          <Label>Год выпуска</Label>
          <Input
            type="text"
            value="2020"
            disabled={true}
            placeholder="Определяется автоматически"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
