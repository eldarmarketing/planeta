import ComponentCard from "../../common/ComponentCard";
import Switch from "../switch/Switch";

export default function ToggleSwitch() {
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };
  return (
    <ComponentCard title="Настройки уведомлений">
      <div className="flex flex-wrap gap-4">
        <Switch
          label="SMS"
          defaultChecked={true}
          onChange={handleSwitchChange}
        />
        <Switch
          label="Email"
          defaultChecked={true}
          onChange={handleSwitchChange}
        />
        <Switch label="Push" disabled={true} />
      </div>{" "}
      <div className="flex flex-wrap gap-4 mt-4">
        <Switch
          label="Напоминание о ТО"
          defaultChecked={true}
          onChange={handleSwitchChange}
          color="gray"
        />
        <Switch
          label="Акции и скидки"
          defaultChecked={true}
          onChange={handleSwitchChange}
          color="gray"
        />
        <Switch label="Рассылка" disabled={true} color="gray" />
      </div>
    </ComponentCard>
  );
}
