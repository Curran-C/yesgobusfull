import "./AboveFooterImages.scss";

const AboveFooterImages = ({ title, images, subtitle }) => {
  return (
    <div className="aboveFooterImages">
      <span className="title">{title}</span>
      {subtitle && <p>{subtitle}</p>}
      <div className="images">
        {images?.map((image) => (
          <img src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default AboveFooterImages;
