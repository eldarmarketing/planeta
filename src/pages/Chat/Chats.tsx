import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ChatSidebar from "../../components/chats/ChatSidebar";
import ChatBox from "../../components/chats/ChatBox";
import PageMeta from "../../components/common/PageMeta";

export default function Chats() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  return (
    <>
      <PageMeta
        title="Чат | planeta"
        description="Чат с клиентами и сотрудниками автосервиса"
      />
      <PageBreadcrumb pageTitle="Чат" />
      <div className="h-[calc(100vh-150px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="flex flex-col h-full gap-6 xl:flex-row xl:gap-5">
          {/* <!-- Chat Sidebar Start --> */}
          <ChatSidebar 
            selectedContactId={selectedContactId}
            onSelectContact={setSelectedContactId}
          />
          {/* <!-- Chat Sidebar End --> */}

          {/* <!-- Chat Box Start --> */}
          <ChatBox selectedContactId={selectedContactId} />
          {/* <!-- Chat Box End --> */}
        </div>
      </div>
    </>
  );
}
