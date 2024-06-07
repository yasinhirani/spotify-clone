/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import HomePageListCard from "../../shared/components/HomePageListCard";
import { useGetSectionOverviewQuery } from "./utility/service/sectionListing.service";
import { useEffect, useState } from "react";
import Loader from "../../shared/components/Loader";

function SectionListing() {
  const { sectionId } = useParams();
  console.log(sectionId);

  const { data: sectionDetailRes } = useGetSectionOverviewQuery(sectionId!, {
    skip: !sectionId,
  });

  const [sectionDetail, setSectionDetail] = useState<any>(null);

  useEffect(() => {
    if (sectionDetailRes) {
      setSectionDetail(sectionDetailRes);
    }
  }, [sectionDetailRes]);

  if (!sectionDetail) {
    return <Loader />;
  }

  return (
    <div className="flex-grow mt-8 px-8 pb-8 space-y-10 w-full max-w-[1440px] mx-auto">
      <h2 className="text-white font-semibold text-2xl">Popular Artist</h2>
      <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        {sectionDetail.contents.items.map((item: any) => {
          return (
            <HomePageListCard
              key={item.id}
              imageUrl={
                Object.prototype.hasOwnProperty.call(item, "visuals")
                  ? item.visuals.avatar[0].url
                  : Object.prototype.hasOwnProperty.call(item, "cover")
                  ? item.cover[0].url
                  : item.images[0][0].url
              }
              title={item.name}
              id={item.id}
              type={item.type}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SectionListing;
