/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import HomePageListCard from "../../shared/components/HomePageListCard";
import Loader from "../../shared/components/Loader";
import { useNavigate } from "react-router-dom";
import { FileRoutes } from "../../core/utilities/constants/core.constants";
import { useGetHomePageDataQuery } from "./utilities/service/home.service";

function Home() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomePageDataQuery();
  const [homepageData, setHomepageData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setHomepageData(data.sections.items);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex-grow mt-10 sm:mt-28 px-8 pb-8 space-y-10 w-full max-w-[1440px] mx-auto">
      {homepageData &&
        homepageData.length > 0 &&
        homepageData.slice(0, 5).map((item: any) => {
          return (
            <div key={item.id}>
              <div className="flex justify-between items-center space-x-5">
                <h4 className="text-white font-semibold text-2xl">
                  {item.title}
                </h4>
                <button
                  className="text-white text-sm"
                  onClick={() =>
                    navigate(
                      `${FileRoutes.SECTION_CONTENT}/${item.type}/${item.id}`
                    )
                  }
                >
                  see all
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                {item.contents.items.slice(0, 5).map((listItem: any) => {
                  return (
                    <HomePageListCard
                      key={listItem.id}
                      imageUrl={
                        Object.prototype.hasOwnProperty.call(
                          listItem,
                          "visuals"
                        )
                          ? listItem.visuals.avatar[0].url
                          : Object.prototype.hasOwnProperty.call(
                              listItem,
                              "cover"
                            )
                          ? listItem.cover[0].url
                          : listItem.images[0][0].url
                      }
                      title={listItem.name}
                      type={listItem.type}
                      id={listItem.id}
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
