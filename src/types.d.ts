import React from "react"

export interface themeTypes {
    title: string,
    icon: IconType
}

export interface navLinkType extends themeTypes {
    path: string
}

export interface fetchPropsType {
    category: string,
    type: string
}


export interface moviesType {
    movies: any,
    category: string
}

export interface sectionPropsType extends moviesType{
    title: string,
    category: string
}