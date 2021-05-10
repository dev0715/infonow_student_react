import React from 'react'
import { useSkin } from '@hooks/useSkin'

const BrandLogo = () => {
    const [skin, setSkin] = useSkin()
    const logo = skin === 'dark' ? 'logo-light.png' : 'logo.png'
    const source = require(`@src/assets/images/logo/${logo}`).default

    return (
        <img src={source} style={{ widht: 30, height: 30 }}/>
    )
}

export default BrandLogo
