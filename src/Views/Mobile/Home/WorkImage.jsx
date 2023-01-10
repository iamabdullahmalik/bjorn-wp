import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
  margin: 50rem 0;
`;

const FirstImage = styled.img`
  height: 30vh;
  aspect-ratio: 2560/1707;
  object-fit: contain;
  align-self: center;
  justify-self: center;
  z-index: 3;
`;

const WorkTitle = styled.p`
  margin-top: 0.8rem;
  font-size: 0.8vw;
  font-size: 1.6rem;
`;

export const WorkImage = ({ work, index, imgRefs, setImgRefs }) => {
  let navigate = useNavigate();
  const navigateToDetail = (workTitle) => {
    navigate(`work/${workTitle}`);
  };

  const imgRef = useRef();

  const imageName = work.images[0].asset._ref.split('-');

  useEffect(() => {
    const _imgRefs = imgRefs;
    _imgRefs.push(imgRef);
    setImgRefs(_imgRefs);
  }, []);

  return (
    <ImageWrapper
      ref={imgRef}
      id={index}
      onClick={() => navigateToDetail(work.title)}>
      <FirstImage
        src={`${import.meta.env.VITE_IMG_URL}/images/f0dahbwy/production/${
          imageName[1]
        }-${imageName[2]}.${imageName[3]}`}
        alt={imageName[1]}
      />
      <WorkTitle>
        {work.title}, {work.year}
      </WorkTitle>
    </ImageWrapper>
  );
};
