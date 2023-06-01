import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MessageFormData } from '../../types/chat/message';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { getMessages, sendMessage } from '../../store/chat/api-actions';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getCurrentContact } from '../../store/contacts/selectors';

export default function NewMessage (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentContact = useAppSelector(getCurrentContact);
  const { register, handleSubmit, reset } = useForm<MessageFormData>();

  const onFormSubmit: SubmitHandler<MessageFormData> = (data) => {
    dispatch(sendMessage({message: data.message, chatId: `${currentContact}@c.us`}))
      // .unwrap() {idMessage}
      .then(() => {
        reset();
        dispatch(getMessages({chatId: `${currentContact}@c.us`, count: 99}));
      });
  };

  const onFormSubmitError: SubmitErrorHandler<MessageFormData> = () => {
    toast.error('Message required');
  };

  return (
    <form className="new-message_form" onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
      <input
        type="text"
        placeholder='type a message'
        className="new-message_input"
        {...register('message', {
          required: true,
        })}
      />
      <button type="submit" className="button new-message_button">
        <svg width="29" height="29" aria-hidden="true">
          <image href="./images/icons/send-button.svg" />
        </svg>
      </button>
    </form>
  );
}
