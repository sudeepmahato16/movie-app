import React from "react";

export interface themeTypes {
  title: string;
  icon: IconType;
}

export interface navLinkType extends themeTypes {
  path: string;
}

export interface moviesSlideProps {
  movies: any;
  category: string;
}

export interface sectionPropsType {
  title: string;
  category: string;
  classes?: string;
  type?: string;
  id?: number;
  showSimilarShows?: boolean;
}

export interface getShowsPropsType {
  category: string | undefined;
  type?: string;
  page?: number;
  searchQuery?: string;
  showSimilarShows?: boolean;
  id?: number;
}

export interface skelatonLoaderPropsTypes {
  classes?: string;
  isMoviesSliderLoader?: boolean;
}

export interface getShowPropsType {
  category: string;
  id: number;
}

export interface sectionsType {
  category: string;
  type: string;
  title: string;
}


