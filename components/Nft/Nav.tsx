import React from "react";
import Offers from "./Offers";
import PropertyCard from "./PropertyCard";
import PropertyMap from "./PropertyMap";
import TradeHistory from "./TradeHistory";

const Nav = ({
  active,
  address,
  nftId
}: {
  active: {
    one: boolean;
    two: boolean;
    three: boolean;
  },
  address: string;
  nftId: string | number
}) => {
  if (active.one) {
    return (
      <div>
        <PropertyMap />
      </div>
    );
  } else if (active.two) {
    return <div>
        <TradeHistory address={address} nftId={nftId} />
    </div>;
  } else if (active.three) {
    return <div>
        <Offers address={address} nftId={nftId}  />
    </div>;
  }
  return (
    <div>
      <PropertyMap />
    </div>
  );
};

export default Nav;
