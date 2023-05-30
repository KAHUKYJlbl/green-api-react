export default function NewMessage (): JSX.Element {
  return (
    <form className="new-message_form">
      <input type="text" placeholder='type a message' className="new-message_input" />
      <button type="submit" className="button new-message_button">
        <svg width="29" height="29" aria-hidden="true">
          <image href="./images/icons/send-button.svg" />
        </svg>
      </button>
    </form>
  );
}
