import { dropId, dropToken } from '../../services/token';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { dropAuth } from '../../store/user/user-slice';

export default function Header (): JSX.Element {
  const dispatch = useAppDispatch();

  const logoutClickHandler = () => {
    dropId();
    dropToken();
    dispatch(dropAuth());
  };

  return (
    <header className="header">
      <div className="user">
        <svg width="49" height="49" aria-hidden="true">
          <image href="./images/icons/user.svg" />
        </svg>

        <p className="user-name">
          GREEN-API-USER
        </p>

        <svg className='button' width="49" height="49" aria-hidden="true" onClick={logoutClickHandler}>
          <image href="./images/icons/logout.svg" />
        </svg>
      </div>
    </header>
  );
}
