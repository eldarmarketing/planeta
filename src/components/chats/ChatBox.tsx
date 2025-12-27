import { useState, useEffect, useRef } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxSendForm from "./ChatBoxSendForm";
import { useMessages } from "../../context/STOContext";
import { getPlanetAvatar } from "../../utils/planetAvatar";

interface ChatBoxProps {
  selectedContactId: string | null;
}

export default function ChatBox({ selectedContactId }: ChatBoxProps) {
  const { getMessagesWithContact, getContactInfo, addMessage, markAsRead } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<{ name: string; role: string; avatar: string } | null>(null);

  // Current user ID (manager)
  const currentUserId = "e5"; // Орлов Максим - Менеджер

  useEffect(() => {
    if (selectedContactId) {
      const msgs = getMessagesWithContact(selectedContactId);
      setMessages(msgs);
      const info = getContactInfo(selectedContactId);
      setContactInfo(info);
      // Mark messages as read
      markAsRead(selectedContactId);
    }
  }, [selectedContactId, getMessagesWithContact, getContactInfo, markAsRead]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (selectedContactId && content.trim()) {
      addMessage({
        senderId: currentUserId,
        receiverId: selectedContactId,
        content: content.trim(),
      });
      // Refresh messages
      const msgs = getMessagesWithContact(selectedContactId);
      setMessages(msgs);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    }
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: typeof messages }[] = [];
  let currentDate = "";
  messages.forEach((msg) => {
    const msgDate = formatDate(msg.timestamp);
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: msgDate, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  if (!selectedContactId) {
    return (
      <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-3/4">
        <svg
          className="w-16 h-16 text-gray-300 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Выберите контакт для начала общения
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Или начните новый разговор с клиентом или сотрудником
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-3/4">
      <ChatBoxHeader 
        contactName={contactInfo?.name || ""}
        contactRole={contactInfo?.role || ""}
        contactAvatar={contactInfo?.avatar || getPlanetAvatar(contactInfo?.name || "")}
      />
      <div className="flex-1 max-h-full p-5 space-y-6 overflow-auto custom-scrollbar xl:space-y-8 xl:p-6">
        {groupedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Нет сообщений с этим контактом
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Напишите первое сообщение
            </p>
          </div>
        ) : (
          groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date separator */}
              <div className="flex items-center justify-center mb-4">
                <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                  {group.date}
                </span>
              </div>
              
              {/* Messages */}
              {group.messages.map((msg) => {
                const isSender = msg.senderId === currentUserId;
                
                return (
                  <div
                    key={msg.id}
                    className={`flex mb-4 ${
                      isSender ? "justify-end" : "items-start gap-4"
                    }`}
                  >
                    {!isSender && (
                      <div className="w-10 h-10 overflow-hidden rounded-full flex-shrink-0">
                        <img
                          src={contactInfo?.avatar || getPlanetAvatar(contactInfo?.name || "")}
                          alt={contactInfo?.name}
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                    )}

                    <div className={`max-w-[70%] ${isSender ? "text-right" : ""}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          isSender
                            ? "bg-brand-500 text-white dark:bg-brand-500 rounded-tr-sm"
                            : "bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white/90 rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <p className="mt-1.5 text-gray-500 text-theme-xs dark:text-gray-400">
                        {formatTime(msg.timestamp)}
                        {isSender && (
                          <span className="ml-2">
                            {msg.isRead ? "✓✓" : "✓"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatBoxSendForm onSend={handleSendMessage} />
    </div>
  );
}
