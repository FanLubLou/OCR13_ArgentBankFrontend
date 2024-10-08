import { Link } from "react-router-dom";

/**
 * Composant affichant une page d'erreur 404.
 * Ce composant informe l'utilisateur que la page demandée n'existe pas
 * et propose un lien pour retourner à la page d'accueil.
 *
 * @export
 * @returns {JSX.Element} Le rendu de la page d'erreur 404, incluant un message et un lien de retour.
 */
export default function Error() {
    return (        
        <div className='wrapperError'>
            <h1 className='Error404'>404</h1>
            <p className='Error404Content'>Oups! La page que vous demandez n'existe pas.</p>
            <Link className='Error404Link' to='/'>Retourner sur la page d'accueil</Link>
        </div>            
    )
}
