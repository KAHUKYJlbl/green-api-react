import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { checkNewContact } from '../../store/contacts/api-actions';
import { getContacts } from '../../store/contacts/selectors';
import { NewContactData } from '../../types/contacts/contacts';


export default function NewContact (): JSX.Element {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(getContacts);
  const { register, handleSubmit, reset } = useForm<NewContactData>();

  const onFormSubmit: SubmitHandler<NewContactData> = (data) => {
    const phoneNumber = Number(data.phoneNumber);

    if (contacts.includes(phoneNumber)) {
      toast.error('Contaxt already exist');
      reset();
      return;
    }

    dispatch(checkNewContact({phoneNumber})).then(() => reset());
  };

  const onFormSubmitError: SubmitErrorHandler<NewContactData> = () => {
    toast.error('Only digits allowed');
  };

  return (
    <form className="new-contact_form" onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
      <input
        type='tel'
        placeholder='type phone number to create new chat'
        className="new-contact_input"
        {...register('phoneNumber', {
          pattern: /[0-9]{10,}/,
          required: true,
        })}
      />
      <button type="submit" className="button new-contact_button">
        <svg width="29" height="29" aria-hidden="true">
          <image href="./images/icons/plus-button.svg" />
        </svg>
      </button>
    </form>
  );
}
