import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";

export default function InputGroup() {
  const countries = [
    { code: "RU", label: "+7" },
    { code: "BY", label: "+375" },
    { code: "KZ", label: "+7" },
    { code: "UA", label: "+380" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Контактные данные">
      <div className="space-y-6">
        <div>
          <Label>Email клиента</Label>
          <div className="relative">
            <Input
              placeholder="client@example.ru"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label>Телефон клиента</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+7 (999) 123-45-67"
            onChange={handlePhoneNumberChange}
          />
        </div>{" "}
        <div>
          <Label>Дополнительный телефон</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+7 (999) 765-43-21"
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
