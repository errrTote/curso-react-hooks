import React, { useState, useEffect } from 'react';

import { List, Item } from './styles';
import { Category } from '../Category';

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false);

  function useCategoriesData () {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
      setLoading(true);
      window.fetch('https://petgram-api-9300-enryggc4m.now.sh/categories')
        .then(res => res.json())
        .then(response => {
          setCategories(response);
          setLoading(false);
        });
    // el [] en las condiciones de ejecución hace que solo se ejecute una unica vez cuando el componente es renderizado
    }, []);

    return { categories, loading };
  }

  useEffect(function () {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== newShowFixed && setShowFixed(newShowFixed);
    };

    document.addEventListener('scroll', onScroll);
    // return para limpiar eventos y no ocupar memoria sin necesidad
    return () => document.removeEventListener('scroll', onScroll);
    // [showFixed] es la condicion para ejecutar el useEfect, cada vez que reciba un cambio se ejecuta
  }, [showFixed]);

  const renderList = (fixed) => (
    // se controlan los estulos a traves de props
    <List fixed={fixed}>
      {
        // de ser necesario mostrar una categoria por defecto mientras carga las demas
        /* loading
          ? <Item key='loading'> <Category /></Item>
          :  */
        categories.map(category => <Item key={category.id}> <Category {...category} path={`/pet/${category.id}`} /> </Item>)
      }
    </List>
  );

  if (loading) {
    return 'Cargando...';
  }
  return (
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  );
};
