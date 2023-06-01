import classNames from 'classnames';

import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { getContacts, getCurrentContact } from '../../store/contacts/selectors';
import { changeCurrentContact, deleteContact } from '../../store/contacts/contacts-slice';
import { SyntheticEvent } from 'react';

export default function ContactsList (): JSX.Element {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(getContacts);
  const currentContact = useAppSelector(getCurrentContact);

  const onContactDelete = (evt: SyntheticEvent, contact: number) => {
    evt.stopPropagation();
    dispatch(deleteContact(contact));
  };

  const onContactChoose = (contact: number) => {
    dispatch(changeCurrentContact(contact));
  };

  return (
    <ul className="contacts-list">
      {contacts.map((contact) => (
        <li
          className={classNames('contacts-list_item', {'contacts-list_item__current': contact === currentContact})}
          onClick={() => onContactChoose(contact)}
          key={contact}
        >
          <div className="user">
            <svg width="49" height="49" aria-hidden="true">
              <image href="./images/icons/user.svg" />
            </svg>

            <p className="user-name">
              +{contact}
            </p>

            <button className="button x-button" onClick={(evt) => onContactDelete(evt, contact)}>
              <svg width="24" height="24" aria-hidden="true">
                <image href="./images/icons/x-button.svg" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
