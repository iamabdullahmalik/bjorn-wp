import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const InfoContactWrapper = styled.div`
  grid-column: 2/4;
  grid-row: 1;
  margin-top: 2rem;
`;

const InfoContactText = styled.p`
  font-size: 1.2vw;
  font-size: 2.6rem;
  margin-bottom: 2.5rem;
`;

const ContactTitle = styled.span`
  font-size: 1.35vw;
  font-size: 1.7rem;
  text-transform: uppercase;
  font-family: Base Grotesk, sans-serif;
`;

const ViewOnMapLink = styled.a`
  font-size: 1.25vw;
  font-size: 2.5rem;
  color: black;
  text-decoration: underline dotted;
  text-underline-offset: 0.3rem;
`;

export const InfoContact = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState(
    new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/Brussels',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/Brussels',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <InfoContactWrapper>
      <InfoContactText>
        Studio Bjorn Verlinde, Hugo Verriestlaan 5 <br />B - 8800 Roeselare,
        Belgium
        <br />
        +32 (0)499 737 487
        <br />
        <ViewOnMapLink
          href='https://goo.gl/maps/UWws26kdgo6k8ibD8'
          target='_blank'>
          {t('ViewOnMap')}
        </ViewOnMapLink>
      </InfoContactText>
      <InfoContactText>
        <ContactTitle>{t('GeneralInquiries')}</ContactTitle>
        <br />
        <a href='mailto:hello@bjornverlinde.studio'>
          hello@bjornverlinde.studio
        </a>
      </InfoContactText>
      <InfoContactText>
        <ContactTitle>{t('JobsInternships')}</ContactTitle>
        <br />
        <a href='mailto:jobs@bjornverlinde.studio'>jobs@bjornverlinde.studio</a>
      </InfoContactText>
      <InfoContactText>
        <ContactTitle>Instagram</ContactTitle>
        <br />
        <a href='https://www.instagram.com/bjornverlinde/' target='_blank'>
          @bjornverlinde
        </a>
      </InfoContactText>
      <InfoContactText>
        <ContactTitle>{t('OfficeHours')}</ContactTitle>
        <br /> {t('MondayFriday')}: 09:00-18:00 <br />
        {t('BelgiumCurrentTime')}: {time}
      </InfoContactText>
    </InfoContactWrapper>
  );
};
