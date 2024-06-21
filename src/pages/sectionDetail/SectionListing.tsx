/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import HomePageListCard from "../../shared/components/HomePageListCard";
import {
  useGetSectionOverviewQuery,
  useGetSectionPlaylistOverviewQuery,
} from "./utility/service/sectionListing.service";
import { useEffect, useState } from "react";
import Loader from "../../shared/components/Loader";

function SectionListing() {
  const { sectionName } = useParams();

  const { data: sectionDetailRes } = useGetSectionOverviewQuery(sectionName!, {
    skip: sectionName === "playlist",
  });

  const { data: sectionPlaylistDetailRes } = useGetSectionPlaylistOverviewQuery(
    {
      skip: sectionName !== "playlist",
    }
  );

  const [sectionDetail, setSectionDetail] = useState<any>(null);

  useEffect(() => {
    if (sectionDetailRes) {
      setSectionDetail(sectionDetailRes.data);
    } else if (sectionPlaylistDetailRes) {
      const detail = {
        title: sectionPlaylistDetailRes.message,
        items: sectionPlaylistDetailRes.playlists.items,
      };
      setSectionDetail(detail);
    }
  }, [sectionDetailRes, sectionPlaylistDetailRes]);

  if (!sectionDetail) {
    return <Loader />;
  }

  return (
    <div className="flex-grow mt-10 sm:mt-28 px-8 pb-8 space-y-10 w-full max-w-[1440px] mx-auto">
      <h2 className="text-white font-semibold text-2xl">
        {sectionDetail.title}
      </h2>
      <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
        {sectionDetail.items.map((item: any) => {
          return (
            <HomePageListCard
              key={item.id}
              imageUrl={item.images[0].url}
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
