export type MessageFormData = {
  message: string;
}

export type MessagesRequestData = {
  chatId: string;
  count: number;
}

export type MessageRequestData = {
  chatId: string;
  idMessage: string;
}

export type NewMessageResponceData = {
  idMessage: string;
}

export type NewMessageData = MessageFormData & {
  chatId: string;
};

export type Message = {
  textMessage: string;
  chatId: string;
  type: 'outgoing' | 'incoming';
  timestamp: number;
  idMessage: string;
}
