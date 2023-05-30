import ChatList from '../../components/chat-list/chat-list';
import ContactsList from '../../components/contacts-list/contacts-list';
import Header from '../../components/header/header';
import NewContact from '../../components/new-contact/new-contact';
import NewMessage from '../../components/new-message/new-message';

export default function Main (): JSX.Element {
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
