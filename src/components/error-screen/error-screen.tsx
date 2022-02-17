import React, { MouseEventHandler } from 'react';

type ErrorScreenProps = {
  onErrorScreenClose: MouseEventHandler<HTMLButtonElement>
}

function ErrorScreen(props: ErrorScreenProps): JSX.Element {
  const {onErrorScreenClose} = props;
  return (
    <React.Fragment>
      <h1>Ошибка! Что-то пошло не так.</h1>
      <button
        onClick={onErrorScreenClose}
      >
        Закрыть
      </button>
    </React.Fragment>
  );
}

export default ErrorScreen;
