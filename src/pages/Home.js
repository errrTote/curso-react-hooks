import React from "react";
import { ListOfPhotoCardsWithQuery } from "../container/ListOfPhotoCardsWithQuery";
import { ListOfCategories } from "../components/ListOfCategories";

export const Home = ({ categoryId }) => {
  return (
    <>
      <ListOfCategories />
      <ListOfPhotoCardsWithQuery categoryId={categoryId} />
    </>
  );
};
