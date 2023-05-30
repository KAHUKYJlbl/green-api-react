export default function NewContact (): JSX.Element {
  return (
    <form className="new-contact_form">
      <input type="tel" placeholder='type phone number to add new chat' className="new-contact_input" />
      <button type="submit" className="button new-contact_button">
        <svg width="29" height="29" aria-hidden="true">
          <image href="./images/icons/plus-button.svg" />
        </svg>
      </button>
    </form>
  );
}
