import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getCurrentContact } from '../../store/contacts/selectors';
import { getMessageList } from '../../store/chat/selectors';
import { getMessages } from '../../store/chat/api-actions';
import classNames from 'classnames';

export default function ChatList (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentContact = useAppSelector(getCurrentContact);
  const messageList = useAppSelector(getMessageList);
  // .sort((a, b) => a.timestamp - b.timestamp);
  useEffect(() => {
    if (currentContact !== 0) {
      dispatch(getMessages({chatId: `${currentContact}@c.us`, count: 99}));
    }
  }, [currentContact]);

  return (
    <ul className="chat-list">
      {messageList.map((message) => (
        <li
          key={message.idMessage}
          className={classNames('chat-list_item', {'chat-list_item__my': message.type === 'outgoing'})}
        >
          <span>
            {message.textMessage}
          </span>
        </li>
      ))}
    </ul>
  );
}
