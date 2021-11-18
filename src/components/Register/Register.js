function Register(props){
  return(
    <section className="register">
      <h1 className="register__greeting">Добро пожаловать!</h1>
      <p className="register__placeholder">Имя</p>
      <input className="register__inpute register__inpute-username"  id="username-input" type="text" name="username" minLength="2" maxLength="40" />
      <span className="username-input-error register__span"></span>
      <p className="register__placeholder">E-mail</p>
      <input className="register__inpute register__inpute-email"  id="email-input" type="text"  name="email" minLength="2" maxLength="40" />
      <span className="email-input-error register__span"></span>
      <p className="register__placeholder">Пароль</p>
      <input className="register__inpute register__inpute-password"  id="password-input" type="text"  name="password" minLength="2" maxLength="40" />
      <span className="password-input-error register__span"></span>
    </section>
  )
}
export default Register;