import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyMap: React.FC<{
  metaData: any;
  address: string;
  nftId: string | number;
}> = ({ metaData, address, nftId }) => {

  return (
    <div className="flex flex-wrap gap-10 lg:ml-10">
      {metaData?.data?.metadata?.attributes?.map((data: any, index: number) => (
        <PropertyCard
          key={index}
          title={data?.trait_type}
          trait={data?.value}
        />
      ))}

      {/* <PropertyCard title="Hair Style" trait="Multi Flower Art" value="15%" />
      <PropertyCard title="Eye" trait="Dark Black" value="7%" />
      <PropertyCard title="Nose" trait="Big Nose" value="25%" />
      <PropertyCard title="Mouth" trait="Smile Dark Lip" value="61%" />
      <PropertyCard title="Neck" trait="Gold Chain" value="15%" />
      <PropertyCard title="Cloth" trait="Black Color" value="75%" />
      <PropertyCard title="Paint" trait="Roof Multi Color" value="85%" />
      <PropertyCard title="Color" trait="Brush Paint" value="95%" /> */}
    </div>
  );
};

export default PropertyMap;
