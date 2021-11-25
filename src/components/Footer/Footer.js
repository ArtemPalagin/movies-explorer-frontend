import './Footer.css';

function Footer(props){
  return(
    <section className="footer">
      <h3 className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__wrapper">
        <p className="footer__year">© 2021</p>
        <div className="footer__links-wrapper">
          <a className="footer__link" href="#">Яндекс.Практикум</a>
          <a className="footer__link" href="#">Github</a>
          <a className="footer__link" href="#">Facebook</a>
        </div>
      </div>
    </section>
  )
}
export default Footer;