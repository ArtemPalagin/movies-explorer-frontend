import './Techs.css';

function Techs(props){
  return(
    <section className="techs" id="techs">
      <h2 className="techs__heading">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__techniligy">HTML</li>
        <li className="techs__techniligy">CSS</li>
        <li className="techs__techniligy">JS</li>
        <li className="techs__techniligy">React</li>
        <li className="techs__techniligy">Git</li>
        <li className="techs__techniligy">Express</li>
        <li className="techs__techniligy">mongoDB</li>
      </ul>
    </section>
  )
}
export default Techs;