import React from 'react'
import "./FeatureItem.scss"

export default function ItemHome({ image, titre, description }) {
  return (
    <div className='feature-item'>
      <img className='feature-icon' src={image} alt='item' />
      <h3 className='feature-item-title'>{titre}</h3>
      <p>{description}</p>
    </div>
  )
}

