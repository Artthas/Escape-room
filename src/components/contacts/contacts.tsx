import { MainLayout, PageTitle, PageSubtext } from 'components/common/common';
import ReactMapGl, {Marker} from 'react-map-gl';
import {useState} from 'react';
import contactsIcon from 'assets/img/map-marker-icon.svg';
import * as officeData from '../../assets/saint-petersburg-office.json';
import * as S from './contacts.styled';

type Viewport = {
  latitude: number,
  longitude: number,
  width: string,
  height: string,
  zoom: number,
}

const Contacts = (): JSX.Element => {
  const [viewport, setViewport] = useState({
    latitude: 59.968115,
    longitude: 30.316477,
    width: '100%',
    height: '100%',
    zoom: 10
  })

  const activeLink = 'Контакты';

  return (
    <MainLayout activeLink={activeLink}>
      <S.Main>
        <S.ContentWrapper>
          <S.PageHeading>
            <PageTitle>Контакты</PageTitle>
            <PageSubtext>квесты в Санкт-Петербурге</PageSubtext>
          </S.PageHeading>

          <S.Contacts>
            <S.ContactsList>
              <S.ContactTitle>Адрес</S.ContactTitle>
              <S.ContactValue>
                <S.ContactAddress>
                  Санкт-Петербург,
                  <br />
                  Набережная реки Карповка, д 5
                </S.ContactAddress>
              </S.ContactValue>

              <S.ContactTitle>Режим работы</S.ContactTitle>
              <S.ContactValue>Ежедневно, с 9:00 до 20:00</S.ContactValue>

              <S.ContactTitle>Телефон</S.ContactTitle>
              <S.ContactValue>
                <S.ContactLink href="tel:8 (800) 333-55-99">
                  8 (800) 333-55-99
                </S.ContactLink>
              </S.ContactValue>

              <S.ContactTitle>E-mail</S.ContactTitle>
              <S.ContactValue>
                <S.ContactLink href="mailto:info@escape-room.ru">
                  info@escape-room.ru
                </S.ContactLink>
              </S.ContactValue>
            </S.ContactsList>
            <S.ContactsMap>
              <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(viewport: Viewport) => {
                  setViewport(viewport);
                }}
              >
                {officeData.features.map((office) => (
                  <Marker key={office.id} latitude={office.geometry.coordinates[1]} longitude={office.geometry.coordinates[0]}>
                    <S.ContactsIconImage
                      src={contactsIcon}
                      width="20px"
                      height="48px"
                    />
                  </Marker>
                ))}
              </ReactMapGl>
            </S.ContactsMap>
          </S.Contacts>
        </S.ContentWrapper>
      </S.Main>
    </MainLayout>
  );
}

export default Contacts;
