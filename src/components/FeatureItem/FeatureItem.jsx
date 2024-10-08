import React from 'react'
/**
 * Composant représentant un élément de fonctionnalité avec une image, un titre et une description.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.image - Le chemin source de l'image à afficher.
 * @param {string} props.titre - Le titre de l'élément de fonctionnalité.
 * @param {string} props.description - La description de l'élément de fonctionnalité.
 * @returns {JSX.Element} Un bloc affichant une image, un titre et une description pour une fonctionnalité donnée.
 */
export default function ItemHome({ image, titre, description }) {
  return (
    <div className='feature-item'>
      <img className='feature-icon' src={image} alt='item' />
      <h3 className='feature-item-title'>{titre}</h3>
      <p>{description}</p>
    </div>
  )
}

