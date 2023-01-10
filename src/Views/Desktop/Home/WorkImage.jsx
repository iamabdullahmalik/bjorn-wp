import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
  margin: 50rem auto;
  width: 50%;
`;

const FirstImage = styled.img`
  grid-column: 2/4;
  grid-row: 1;
  width: 110%;
  aspect-ratio: 3/2;
  object-fit: contain;
  align-self: center;
  justify-self: center;
  z-index: 3;
`;

const WorkTitle = styled.p`
  font-size: 0.8vw;
  font-size: 1.6rem;
  margin-top: 0.8rem;
`;

export const WorkImage = ({
  work,
  index,
  worksLength,
  workRefs,
  setWorkRefs,
}) => {
  let navigate = useNavigate();
  const workRef = useRef();
  const navigateToDetail = (workTitle) => {
    navigate(`work/${workTitle}`);
  };

  const imageName = work.images[0].asset._ref.split('-');

  useEffect(() => {
    const _workRefs = workRefs;
    _workRefs.push(workRef);
    setWorkRefs(_workRefs);
  }, []);

  return (
    <ImageWrapper
      first={index === 0 ? true : false}
      ref={workRef}
      last={index + 1 === worksLength ? true : false}
      onClick={() => navigateToDetail(work.title)}
      key={index}>
      <FirstImage
        src={`${import.meta.env.VITE_IMG_URL}/images/f0dahbwy/production/${
          imageName[1]
        }-${imageName[2]}.${imageName[3]}`}
        alt='foto'
      />
      <WorkTitle>
        {work.title}, {work.year}
      </WorkTitle>
    </ImageWrapper>
  );
};
