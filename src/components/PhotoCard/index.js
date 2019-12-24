import React from 'react';
import { Link } from '@reach/router';
import { Article, ImgWrapper, Img } from './styles';
import { useNearScreen } from '../../hooks/useNearScreen';
import { FavButton } from '../FavButton';
import { ToggleLikeMutation } from '../../container/ToggleLikeMutatio';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png';

export const PhotoCard = ({ id, liked, likes = 0, src = DEFAULT_IMAGE }) => {
  
  const [show, element] = useNearScreen();

  return (
    // ref={element} le esta seteando al Article la referencia de useRef
    <Article ref={element}>
      {// verifica si el useState de show esta en true para renderizar o no
        show && (
          <>
            <Link to={`/detail/${id}`}>
              <ImgWrapper>
                <Img src={src} />
              </ImgWrapper>
            </Link>
            <ToggleLikeMutation>
              {
                (toggleLike) => {
                  const handlerFavClick = () => {
                    toggleLike({
                      variables: {
                        input: { id }
                      }
                    });
                  };
                  return <FavButton liked={liked} likes={likes} onClick={handlerFavClick} />;
                }
              }
            </ToggleLikeMutation>

          </>
        )
      }
    </Article>
  );
};
