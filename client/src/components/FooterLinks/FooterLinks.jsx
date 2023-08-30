import "./FooterLinks.scss";

const FooterLinks = ({ title, links }) => {
  return (
    <div className="footerLinks">
      <h1>{title}</h1>
      <div className="links">
        {links?.map((link) => (
          <a href="">{link}</a>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
