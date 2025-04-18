/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import HomePageListCard from "../../shared/components/HomePageListCard";
import Loader from "../../shared/components/Loader";
import { useNavigate } from "react-router-dom";
import { FileRoutes } from "../../core/utilities/constants/core.constants";
import {
  useGetHomePageDataQuery,
} from "./utilities/service/home.service";

function Home() {
  const navigate = useNavigate();

  const { data: homepageDataRes, isLoading } = useGetHomePageDataQuery();
  const [homepageData, setHomepageData] = useState<any>(null);

  useEffect(() => {
    if (homepageDataRes) {
      setHomepageData(homepageDataRes.data);
    }
  }, [homepageDataRes]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex-grow mt-4 md:mt-28 px-4 md:px-8 pb-8 space-y-10 w-full max-w-[1440px] mx-auto">
      {homepageData &&
        homepageData.length > 0 &&
        homepageData.map((item: any, index: number) => {
          return (
            <div key={item.id}>
              <div className="flex justify-between items-center space-x-5">
                <h4 className="text-white font-semibold text-2xl">
                  {item.title}
                </h4>
                {index ? <button
                  className="text-white text-sm"
                  onClick={() =>
                    navigate(`${FileRoutes.SECTION_CONTENT}/${item.type}`)
                  }
                >
                  see all
                </button> : null}
              </div>
              <div className="scroll-card-grid mt-6">
                {item.contents.items.slice(0, 5).map((listItem: any) => {
                  return (
                    <HomePageListCard
                      key={listItem.id}
                      imageUrl={listItem.images[0].url}
                      title={listItem.name}
                      type={listItem.type}
                      id={listItem.id}
                      description={
                        (listItem.type === "artist" && "Artist") ||
                        (listItem.type === "album" &&
                          listItem.artists
                            .map((artist: any) => artist.name)
                            .join(", ")) ||
                        (listItem.type === "playlist" && listItem.description)
                      }
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
    </main>
  );
}

export default Home;
