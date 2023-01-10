import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Underline } from '../../../style';

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  scroll-snap-align: center;
  margin: ${(props) => (props.isFirst ? '2rem 0 7rem 0' : '7rem 0')};
`;

const FirstImage = styled.img`
  width: 100%;
  aspect-ratio: 2560/1707;
  object-fit: cover;
  align-self: center;
  justify-self: center;
  z-index: 3;
`;

const WorkTitle = styled.p`
  font-size: 0.75vw;
  font-size: 1.5rem;
  margin-top: 1rem;
  text-transform: capitalize;
`;

export const WorkImageWork = ({ work, index }) => {
  let navigate = useNavigate();
  const navigateToDetail = (workTitle) => {
    navigate(`${workTitle}`);
  };

  const imageName = work.images[0].asset._ref.split('-');
  const { t } = useTranslation();
  return (
    <ImageWrapper
      isFirst={index === 0 ? true : false}
      onClick={() => navigateToDetail(work.title)}>
      <FirstImage
        src={`${import.meta.env.VITE_IMG_URL}/images/f0dahbwy/production/${
          imageName[1]
        }-${imageName[2]}.${imageName[3]}`}
        alt={imageName[1]}
      />
      <WorkTitle>
        {work.title}, (<Underline>{t(`${work.category}`)}</Underline>)
      </WorkTitle>
    </ImageWrapper>
  );
};
