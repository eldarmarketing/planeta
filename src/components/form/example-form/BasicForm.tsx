import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import Button from "../../ui/button/Button";

export default function BasicForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    carBrand: "",
    carModel: "",
    gosNumber: "",
    vin: "",
    mileage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Клиент добавлен:", formData);
    // Показать уведомление об успехе
    alert("Клиент успешно добавлен!");
  };

  const carBrands = [
    { value: "toyota", label: "Toyota" },
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes-Benz" },
    { value: "audi", label: "Audi" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "kia", label: "Kia" },
    { value: "hyundai", label: "Hyundai" },
    { value: "lexus", label: "Lexus" },
    { value: "porsche", label: "Porsche" },
    { value: "other", label: "Другая марка" },
  ];

  const handleBrandChange = (value: string) => {
    setFormData((prev) => ({ ...prev, carBrand: value }));
  };

  return (
    <ComponentCard title="Добавить клиента">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="col-span-2">
            <Label htmlFor="clientName">ФИО клиента</Label>
            <Input
              type="text"
              placeholder="Иванов Иван Иванович"
              id="clientName"
              value={formData.clientName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientName: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="carBrand">Марка автомобиля</Label>
            <Select
              options={carBrands}
              placeholder="Выберите марку"
              onChange={handleBrandChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="carModel">Модель</Label>
            <Input
              type="text"
              placeholder="Camry, X5, E-Class..."
              id="carModel"
              value={formData.carModel}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, carModel: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="gosNumber">Гос. номер</Label>
            <Input
              type="text"
              placeholder="А123ВС77"
              id="gosNumber"
              value={formData.gosNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gosNumber: e.target.value.toUpperCase(),
                }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="vin">VIN (опционально)</Label>
            <Input
              type="text"
              placeholder="JTDBR32E960017..."
              id="vin"
              value={formData.vin}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vin: e.target.value.toUpperCase(),
                }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="mileage">Пробег (км)</Label>
            <Input
              type="number"
              placeholder="125000"
              id="mileage"
              value={formData.mileage}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mileage: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2">
            <Button className="w-full" size="sm">
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Добавить клиента
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
