import * as S from './booking-modal.styled';
import { ReactComponent as IconClose } from 'assets/img/icon-close.svg';
import {postOrderAction} from '../../../../store/api-actions';
import {useState, useRef, FormEvent, ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import ErrorScreen from '../../../error-screen/error-screen';
import {Quest} from '../../../../types/quest';
import {Order} from '../../../../types/order';

const PHONE_NUMBER_COUNT = 10;

type BookingModalProps = {
  currentQuest: Quest,
  onClosingBookingBtnClick(): void,
}

const BookingModal = ({currentQuest, onClosingBookingBtnClick}: BookingModalProps): JSX.Element => {
  const dispatch = useDispatch();

  const phoneRef = useRef<HTMLInputElement | null>(null);
  const peopleCountRef = useRef<HTMLInputElement | null>(null);

  const onErrorScreenClose = () => {
    setIsErrorShown(false);
  };

  const [isErrorShown, setIsErrorShown] = useState(false);

  const onSuccess = () => {
    setIsErrorShown(false);
    onClosingBookingBtnClick();
  };

  const onFail = () => {
    setIsErrorShown(true);
  };

  const [order, setOrder] = useState({
    'name': '',
    'peopleCount': 0,
    'phone': '',
    'isLegal': true,
  });

  const onSubmit = ({name, peopleCount, phone, isLegal}: Order) => {
    dispatch(postOrderAction({name, peopleCount, phone, isLegal}, onSuccess, onFail));
  };

  const onBookingFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (phoneRef.current && peopleCountRef.current) {
      if (phoneRef.current.value.length !== PHONE_NUMBER_COUNT) {
        phoneRef.current.setCustomValidity('Номер должен состоять из десяти цифр');
        phoneRef.current.reportValidity();
      } else if (Number(peopleCountRef.current.value) < currentQuest.peopleCount[0]) {
        peopleCountRef.current.setCustomValidity('Слишком мало');
        peopleCountRef.current.reportValidity();
      } else if (Number(peopleCountRef.current.value) > currentQuest.peopleCount[1]) {
        peopleCountRef.current.setCustomValidity('Слишком много');
        peopleCountRef.current.reportValidity();
      } else {
        onSubmit({
          name: order.name,
          peopleCount: order.peopleCount,
          phone: order.phone,
          isLegal: order.isLegal,
        });
      }
    }
  };

  const nameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setOrder((prevState) => ({...prevState, 'name': evt.target.value}));
    console.log(evt.target.value);
  };

  const phoneHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setOrder((prevState) => ({...prevState, 'phone': evt.target.value}));
    if (evt.target.value.length === PHONE_NUMBER_COUNT && phoneRef.current) {
      phoneRef.current.setCustomValidity('');
      phoneRef.current.reportValidity();
    }
  };

  const peopleCountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setOrder((prevState) => ({...prevState, 'peopleCount': Number(evt.target.value)}));
    if (Number(evt.target.value) >= currentQuest.peopleCount[0] && Number(evt.target.value) <= currentQuest.peopleCount[1] && peopleCountRef.current) {
      peopleCountRef.current.setCustomValidity('');
      peopleCountRef.current.reportValidity();
    }
  };

  return (
    <S.BlockLayer>
      {isErrorShown ? <ErrorScreen onErrorScreenClose={onErrorScreenClose}/> : ''}
      <S.Modal>
        <S.ModalCloseBtn
          onClick={onClosingBookingBtnClick}
        >
          <IconClose width="16" height="16" />
          <S.ModalCloseLabel>Закрыть окно</S.ModalCloseLabel>
        </S.ModalCloseBtn>
        <S.ModalTitle>Оставить заявку</S.ModalTitle>
        <S.BookingForm
          onSubmit={onBookingFormSubmit}
          action="#"
          id="booking-form"
        >
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-name">Ваше Имя</S.BookingLabel>
            <S.BookingInput
              onChange={nameHandler}
              type="text"
              id="booking-name"
              name="booking-name"
              placeholder="Имя"
              required
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-phone">
              Контактный телефон
            </S.BookingLabel>
            <S.BookingInput
              onChange={phoneHandler}
              type="tel"
              id="booking-phone"
              name="booking-phone"
              placeholder="Телефон"
              ref={phoneRef}
              required
            />
          </S.BookingField>
          <S.BookingField>
            <S.BookingLabel htmlFor="booking-people">
              Количество участников
            </S.BookingLabel>
            <S.BookingInput
              onChange={peopleCountHandler}
              type="number"
              id="booking-people"
              name="booking-people"
              placeholder="Количество участников"
              ref={peopleCountRef}
              required
            />
          </S.BookingField>
          <S.BookingSubmit type="submit">Отправить заявку</S.BookingSubmit>
          <S.BookingCheckboxWrapper>
            <S.BookingCheckboxInput
              type="checkbox"
              id="booking-legal"
              name="booking-legal"
              required
            />
            <S.BookingCheckboxLabel
              className="checkbox-label"
              htmlFor="booking-legal"
            >
              <S.BookingCheckboxText>
                Я согласен с{' '}
                <S.BookingLegalLink href="#">
                  правилами обработки персональных данных и пользовательским
                  соглашением
                </S.BookingLegalLink>
              </S.BookingCheckboxText>
            </S.BookingCheckboxLabel>
          </S.BookingCheckboxWrapper>
        </S.BookingForm>
      </S.Modal>
    </S.BlockLayer>
  );
}

export default BookingModal;
