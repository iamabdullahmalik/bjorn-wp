import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BjornTextTop, BjornTextTopMobile, StyledLink } from '../../../style';
import { searchByTitle } from '../../../utils/findWorks';
import { WorkTextInfo } from './WorkTextInfo';
import CrossSVG from '../../../assets/cross.svg';
import { useTranslation } from 'react-i18next';
import Div100vh from 'react-div-100vh';

const DetailWrapper = styled(Div100vh)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  z-index: 5;
  padding: 2rem;
`;

const SmallText = styled.p`
  font-size: 0.8vw;
  font-size: 1.6rem;
  margin: 0;
`;

const SmallTextBottom = styled(SmallText)`
  padding: 2rem;
  font-family: Base Grotesk, sans-serif;
  display: flex;
  justify-content: space-between;
`;

const BackToWorkLink = styled(StyledLink)`
  z-index: 500;
  font-family: Base Grotesk, sans-serif;
  justify-content: center;
  align-items: center;
  max-height: 2.5rem;
  overflow: hidden;
  img {
    height: 3rem;
    width: 3rem;
  }
`;

const WorkImagesWrapper = styled.div`
  z-index: 100;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WorkImage = styled.img`
  scroll-snap-align: center;
  width: calc(100vw - 40px);
  aspect-ratio: 3/2;
  object-fit: contain;
  margin: 0 20rem;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const TextImgButton = styled.button`
  font-size: 0.8vw;
  font-size: 1.6rem;
  margin: 0;
  background: none;
  border: none;
  padding: 0;
  z-index: 500;
`;

const WorkWrapper = styled.div`
  grid-column: 2/4;
  grid-row: 1;
  align-self: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

export const WorkDetail = () => {
  const [showImages, setShowImages] = useState(true);
  let navigate = useNavigate();

  const { workTitle } = useParams();

  const work = searchByTitle(workTitle);

  const navBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const { t } = useTranslation();

  return (
    <DetailWrapper>
      <InfoWrapper>
        <BjornTextTopMobile to='/'>
          {t('For')} {work.client}
        </BjornTextTopMobile>
        <SmallText>
          {work.title}, {work.year}
        </SmallText>
      </InfoWrapper>
      <WorkWrapper>
        <WorkImagesWrapper>
          {work.images.map((img, index) => {
            const imageName = img.asset._ref.split('-');
            return (
              <WorkImage
                src={`${
                  import.meta.env.VITE_IMG_URL
                }/images/f0dahbwy/production/${imageName[1]}-${imageName[2]}.${
                  imageName[3]
                }`}
                alt={`${work.title} ${index}`}
              />
            );
          })}
        </WorkImagesWrapper>
        <WorkTextInfo showText={!showImages} work={work} />
      </WorkWrapper>
      <SmallTextBottom as='div'>
        {showImages ? (
          <>
            <TextImgButton onClick={() => setShowImages(false)}>
              <Underline>{t('ReadText')}</Underline>
            </TextImgButton>
            <BackToWorkLink onClick={(e) => navBack(e)} to={'/'}>
              <img src={CrossSVG} />
            </BackToWorkLink>
          </>
        ) : (
          <TextImgButton onClick={() => setShowImages(true)}>
            <Underline>{t('CloseText')}</Underline>
          </TextImgButton>
        )}
      </SmallTextBottom>
    </DetailWrapper>
  );
};
