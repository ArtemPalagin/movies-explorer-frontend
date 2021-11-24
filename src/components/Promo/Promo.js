import promoLogo from '../../images/promo-logo.svg';
import './Promo.css';

function Promo(props) {
  return(
    <section className="promo">
      <image className="promo__logo" src={promoLogo} alt="Не получислось загрузить картинку логотипа" />
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;