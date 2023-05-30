export default function ContactsList (): JSX.Element {
  return (
    <ul className="contacts-list">
      <li className="contacts-list_item">
        <div className="user">
          <svg width="49" height="49" aria-hidden="true">
            <image href="./images/icons/user.svg" />
          </svg>

          <p className="user-name">
            +7 (812) 999-11-11
          </p>

          <button className="button x-button">
            <svg width="24" height="24" aria-hidden="true">
              <image href="./images/icons/x-button.svg" />
            </svg>
          </button>
        </div>
      </li>

      <li className="contacts-list_item contacts-list_item__current">
        <div className="user">
          <svg width="49" height="49" aria-hidden="true">
            <image href="./images/icons/user.svg" />
          </svg>

          <p className="user-name">
            +7 (812) 999-11-11
          </p>

          <button className="button x-button">
            <svg width="24" height="24" aria-hidden="true">
              <image href="./images/icons/x-button.svg" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  );
}
