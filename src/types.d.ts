import React from "react"

export interface themeTypes {
    title: string,
    icon: IconType
}

export interface navLinkType extends themeTypes {
    path: string
}