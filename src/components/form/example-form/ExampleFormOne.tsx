import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";

export default function ExampleFormOne() {
  const [formData, setFormData] = useState({
    clientSearch: "",
    carSearch: "",
    workType: "",
    postNumber: "",
    mechanic: "",
    description: "",
    estimatedCost: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Заказ-наряд создан:", formData);
    alert("Заказ-наряд успешно создан!");
  };

  const workTypes = [
    { value: "to", label: "Техническое обслуживание (ТО)" },
    { value: "repair", label: "Ремонт" },
    { value: "diagnostics", label: "Диагностика" },
    { value: "tire", label: "Шиномонтаж" },
    { value: "body", label: "Кузовные работы" },
    { value: "electrical", label: "Электрика" },
    { value: "suspension", label: "Подвеска / Ходовая" },
    { value: "brakes", label: "Тормозная система" },
    { value: "other", label: "Другое" },
  ];

  const posts = [
    { value: "1", label: "Пост №1 (Подъёмник)" },
    { value: "2", label: "Пост №2 (Подъёмник)" },
    { value: "3", label: "Пост №3 (Яма)" },
    { value: "4", label: "Пост №4 (Диагностика)" },
    { value: "5", label: "Пост №5 (Шиномонтаж)" },
  ];

  const mechanics = [
    { value: "petrov", label: "Петров Александр" },
    { value: "sidorov", label: "Сидоров Василий" },
    { value: "kuznetsov", label: "Кузнецов Игорь" },
    { value: "volkov", label: "Волков Дмитрий" },
    { value: "morozov", label: "Морозов Павел" },
  ];

  const handleWorkTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, workType: value }));
  };

  const handlePostChange = (value: string) => {
    setFormData((prev) => ({ ...prev, postNumber: value }));
  };

  const handleMechanicChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mechanic: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  return (
    <ComponentCard title="Создать заказ-наряд">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="clientSearch">Клиент (поиск)</Label>
            <Input
              type="text"
              placeholder="Введите ФИО или телефон..."
              id="clientSearch"
              value={formData.clientSearch}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  clientSearch: e.target.value,
                }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="carSearch">Автомобиль (поиск)</Label>
            <Input
              type="text"
              placeholder="Гос. номер или VIN..."
              id="carSearch"
              value={formData.carSearch}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, carSearch: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="workType">Вид работ</Label>
            <Select
              options={workTypes}
              placeholder="Выберите вид работ"
              onChange={handleWorkTypeChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="postNumber">Пост</Label>
            <Select
              options={posts}
              placeholder="Выберите пост"
              onChange={handlePostChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="mechanic">Механик</Label>
            <Select
              options={mechanics}
              placeholder="Назначить механика"
              onChange={handleMechanicChange}
              defaultValue=""
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="description">Описание работ</Label>
            <TextArea
              placeholder="Опишите необходимые работы, жалобы клиента, комментарии..."
              rows={4}
              value={formData.description}
              onChange={handleDescriptionChange}
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="estimatedCost">Предварительная стоимость (₽)</Label>
            <Input
              type="number"
              placeholder="0"
              id="estimatedCost"
              value={formData.estimatedCost}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  estimatedCost: e.target.value,
                }))
              }
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-end">
            <Button className="w-full" size="sm">
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Создать заказ-наряд
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
