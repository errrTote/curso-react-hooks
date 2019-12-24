import React from 'react';
import { ListOfPhotoCardsComponent } from '../components/ListOfPhotoCards';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_PHOTOS = gql`
query getPhotos($categoryId: ID) {
  photos(categoryId: $categoryId){
    id
    categoryId
    src
    likes
    userId
    liked
  }
}
`;

// export const ListOfPhotoCards = withPhotos(ListOfPhotoCardsComponent)
export const ListOfPhotoCardsWithQuery = ( {categoryId} ) => {  
  return <Query query={GET_PHOTOS} variables={{ categoryId }}>
    {
      ({ loading, error, data }) => {
        if (loading) return 'Cargando...';
        return <ListOfPhotoCardsComponent {...data} />;
      }
    }
  </Query>;
};
