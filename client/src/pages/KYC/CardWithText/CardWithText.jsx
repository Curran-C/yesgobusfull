import "./CardWithText.scss";

const CardWithText = ({ title, billing, address, user, idType }) => {
  return (
    <div className="CardWithText">
      <div className={billing ? "billing" : "hidden"}>
        <h3>{title}</h3>
        <div className="text">
          <p>Name:</p>
          <p style={{ fontWeight: "bold" }}>{user?.name}</p>
        </div>
        <div className="text">
          <p>{idType}:</p>
          <p style={{ fontWeight: "bold" }}>{user?.pan}</p>
        </div>
        <div className="text">
          <p>Email:</p>
          <p style={{ fontWeight: "bold" }}>{user?.email}</p>
        </div>
      </div>
      <div className={billing ? "hidden" : "address"}>
        <h3>Our Address</h3>
        <p>{address?.line1}</p>
        <p>{address?.line2}</p>
        <p>{address?.line3}</p>
        <p>{address?.line4}</p>
      </div>

    </div>
  );
};

export default CardWithText;
