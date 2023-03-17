import React from "react";
import PropertyCard from "./PropertyCard";

const Properties = () => {
  const [active, setActive] = React.useState({
    one: true,
    two: false,
    three: false,
  });

  const setIsActive = (num: number) => {
    switch (num) {
      case 0:
        setActive({
          one: true,
          two: false,
          three: false,
        });
        break;
      case 1:
        setActive({
          one: false,
          two: true,
          three: false,
        });
        break;
      case 2:
        setActive({
          one: false,
          two: false,
          three: true,
        });
        break;
    }
  };

  return (
    <div className="border dark:bg-[#041824] border-black dark:border-[#092940] p-4 rounded-md hover:shadow-xl mt-9">
      <div className="flex flex-col lg:flex-row p-1 border w-full lg:w-fit px-3 py-2 space-x-0 lg:space-x-4 border-yellow-500 rounded-md mb-5">

        <div onClick={() => {setIsActive(0)}} className={`cursor-pointer p-2 ${active.one ? 'bg-[#feb019] rounded-md hover:text-white ' : 'hover:text-[#feb019]'}`}>
          Properties
        </div>

        <div onClick={() => {setIsActive(1)}} className={`cursor-pointer p-2 ${active.two ? 'bg-[#feb019] rounded-md hover:text-white ' : 'hover:text-[#feb019]'}`}>History</div>

        <div onClick={() => {setIsActive(2)}} className={`cursor-pointer p-2 ${active.three ? 'bg-[#feb019] rounded-md hover:text-white ' : 'hover:text-[#feb019]'}`}>Offers</div>
      </div>

<div className="flex mx-auto justify-center items-center mb-8">
<div className="flex flex-wrap gap-10 lg:ml-10">
        <PropertyCard title='Hair Style' trait='Multi Flower Art' value='15%' />
        <PropertyCard title='Eye' trait='Dark Black' value='7%' />
        <PropertyCard title='Nose' trait='Big Nose' value='25%' />
        <PropertyCard title='Mouth' trait='Smile Dark Lip' value='61%' />
        <PropertyCard title='Neck' trait='Gold Chain' value='15%' />
        <PropertyCard title='Cloth' trait='Black Color' value='75%' />
        <PropertyCard title='Paint' trait='Roof Multi Color' value='85%' />
        <PropertyCard title='Color' trait='Brush Paint' value='95%' />
      </div>
</div>
    </div>
  );
};

export default Properties;
