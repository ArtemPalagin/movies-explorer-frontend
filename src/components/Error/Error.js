import './Error.css';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <section className="error">
      <div className="error__wrapper">
        <h1 className="error__number">404</h1>
        <p className="error__text">Страница не найдена</p>
      </div>
      <Link to="/" className="error__link">Назад</Link>
    </section>
  )
}
export default Error;