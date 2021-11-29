import './Preloader.css';

function Preloader(props) {
  return (
    <>
      <div className={`preloader ${props.preloaderActive ? "" : "preloader_inactive"}`}></div>
      <p className="preloader__notice">{props.message}</p>
    </>
  )
}
export default Preloader;