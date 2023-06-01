import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { clearNotification, pushNewMessage } from '../../store/chat/chat-slice';
import { deleteNotification, getNotification } from '../../store/chat/api-actions';
import { getCurrentContact } from '../../store/contacts/selectors';

import ContactsList from '../../components/contacts-list/contacts-list';
import NewContact from '../../components/new-contact/new-contact';
import NewMessage from '../../components/new-message/new-message';
import ChatList from '../../components/chat-list/chat-list';
import Header from '../../components/header/header';
import { addContact } from '../../store/contacts/contacts-slice';
import { getStoredNotification } from '../../store/chat/selectors';

export default function Main (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentContact = useAppSelector(getCurrentContact);
  const notification = useAppSelector(getStoredNotification);

  useEffect(() => {
    if (notification) {
      const {receiptId, body: {timestamp, idMessage, senderData, messageData}} = notification;

      if (senderData.chatId === `${currentContact}@c.us`) {
        dispatch(pushNewMessage({
          textMessage: messageData.textMessageData.textMessage,
          chatId: senderData.chatId,
          type: 'incoming',
          timestamp,
          idMessage,
        }));
      } else {
        const index = senderData.sender.indexOf('@');
        dispatch(addContact(+senderData.sender.slice(0, index)));
      }
      dispatch(deleteNotification(receiptId));
      dispatch(clearNotification());
    }
  }, [notification]);

  useEffect(() => {
    const timer = setInterval(
      () => dispatch(getNotification()),
      10000
    );
    return () => clearInterval(timer);
  });

  return (
    <div className="main-wrapper">
      <div className="left-bar">
        <Header />

        <div className="contacts">
          <NewContact />

          <ContactsList />
        </div>
      </div>

      <div className="chat">
        <ChatList />

        <NewMessage />
      </div>
    </div>
  );
}
