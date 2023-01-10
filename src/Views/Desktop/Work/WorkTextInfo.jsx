import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import i18n from '../../../i18n';

const SlideUpAnimation = keyframes`
  from{
   transform: translateY(50vw);
  }

  to{
    transform: translateY(0);
  }
`;

const WorkAboutText = styled.p`
  font-size: 1.4vw;
  font-size: 2.8rem;
  width: 50%;
  margin: 0 auto;
`;

const WorkDetailInfoList = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-family: Base Grotesk, sans-serif;
  font-size: 1.6vw;
  font-size: 1.8rem;
  width: 50%;
  margin: 0 auto;
  margin-top: 5rem;
`;

const WorkDetailInfoLabel = styled.p`
  grid-column: 1;
`;

const WorkDetailInfoText = styled.p`
  grid-column: 2;
`;

const WorkTextWrapper = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: auto;
  z-index: 300;
  background: white;

  display: ${(props) => (props.show ? 'box' : 'none')};
  animation: ${SlideUpAnimation} 0.5s ease-out;
`;

export const WorkTextInfo = ({ work, showText }) => {
  const { t } = useTranslation();
  const lang = i18next.language;
  return (
    <WorkTextWrapper show={showText}>
      <WorkAboutText>
        {work[lang]} tekst is longer and longer so we see diffrece. tekst is
        longer and longer diffrece . tend longer so we see diffrece longer so we
        see diffrece. tekst is longer and longer so we see diffrec tekst is
        longer and longer e diffrec tekst is longer and longer
      </WorkAboutText>
      <WorkDetailInfoList>
        <WorkDetailInfoLabel>{t('Year')}</WorkDetailInfoLabel>
        <WorkDetailInfoText>{work.year}</WorkDetailInfoText>
        <WorkDetailInfoLabel>{t('Client')}</WorkDetailInfoLabel>
        <WorkDetailInfoText>{work.client}</WorkDetailInfoText>
        <WorkDetailInfoLabel>{t('Location')}</WorkDetailInfoLabel>
        <WorkDetailInfoText>{work.location}</WorkDetailInfoText>
        <WorkDetailInfoLabel>{t('Size')}</WorkDetailInfoLabel>
        <WorkDetailInfoText>{work.size}</WorkDetailInfoText>
        <WorkDetailInfoLabel>{t('Status')}</WorkDetailInfoLabel>
        <WorkDetailInfoText>{t(work.status)}</WorkDetailInfoText>
        <WorkDetailInfoLabel>{t('Photography')}</WorkDetailInfoLabel>
        <WorkDetailInfoText>{work.photography}</WorkDetailInfoText>
      </WorkDetailInfoList>
    </WorkTextWrapper>
  );
};
