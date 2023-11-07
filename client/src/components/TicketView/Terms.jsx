import "./Terms.scss";

export default function Terms({ cancellationPolicy }) {
  let sortedPolicy = [];
  if (cancellationPolicy) {
    const policyArray = JSON.parse(cancellationPolicy.replace(/\\/g, ''));;
    sortedPolicy = policyArray.sort((a, b) => {
      const cutoffA = parseInt(a.cutoffTime.split('-')[0]);
      const cutoffB = parseInt(b.cutoffTime.split('-')[0]);
      return cutoffA - cutoffB;
    });
  }

  return (
    <div className="terms">
      <h2>Terms and Conditions</h2>
      <ul>
        <li>
          <p>
            Yesgobus Travellers can book bus tickets online at the lowest ticket
            fares. Travellers prefer to choose their favorite bus to reserve
            online bus booking. You’re at the right place to find a wide range
            of Private buses and SRTC (State Road Transport Corporation) buses
            are available for bus booking online on bus.
          </p>
        </li>
        <li>
          <p>
            Passengers should arrive at the 15 min before the scheduled time of
            departure.
          </p>
        </li>
        <li>
          <p>
            Yesgobus is not responsible for any accident or any passenger
            losses.
          </p>
        </li>
        <li>
          <p>
            Cancellation charges are applicable on original fare but not available on discount.
          </p>
        </li>
        {sortedPolicy?.map((policy, index) => (
          <li key={index}>
            <p>
              {`If cancelled ${policy.cutoffTime} hours before departure, a refund of ${policy.refundInPercentage}% will be provided.`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
