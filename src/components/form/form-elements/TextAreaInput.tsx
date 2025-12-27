import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard title="Описание работ">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label>Описание проблемы</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
            placeholder="Опишите проблему или необходимые работы..."
          />
        </div>

        {/* Disabled TextArea */}
        <div>
          <Label>Комментарий механика</Label>
          <TextArea rows={6} disabled placeholder="Заполняется механиком" />
        </div>

        {/* Error TextArea */}
        <div>
          <Label>Дополнительные пожелания</Label>
          <TextArea
            rows={6}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Пожалуйста, заполните это поле."
          />
        </div>
      </div>
    </ComponentCard>
  );
}
