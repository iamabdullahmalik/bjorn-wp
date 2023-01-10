import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const WorkImg = styled.img`
  scroll-snap-align: center;
  aspect-ratio: ${(props) => (props.isVertical ? '2/3' : '3/2')};
  object-fit: contain;
  margin: 0 40rem;
  width: ${(props) => (props.isVertical ? '100%' : '80%')};
  max-height: 75vh;
  max-width: 75vw;
`;

export const WorkImage = ({
  setImgRefs,
  imgRefs,
  imgName,
  index,
  imgLength,
  setImgRestart,
  imgRestart,
}) => {
  const imgRef = useRef();
  const dimensions = imgName[2].split('x');

  useEffect(() => {
    const _imgRefs = imgRefs;
    _imgRefs.push(imgRef);
    setImgRefs(_imgRefs);
    if (index + 1 === imgLength && !imgRestart) {
      setImgRestart(true);
    }
  }, []);
  return (
    <>
      <WorkImg
        key={imgName[1]}
        ref={imgRef}
        isVertical={+dimensions[0] < +dimensions[1]}
        src={`${import.meta.env.VITE_IMG_URL}/images/f0dahbwy/production/${
          imgName[1]
        }-${imgName[2]}.${imgName[3]}`}
        alt={`${imgName[1]}`}
      />
    </>
  );
};
