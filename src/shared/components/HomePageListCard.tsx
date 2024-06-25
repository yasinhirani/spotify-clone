import { useNavigate } from "react-router-dom";
import { FileRoutes } from "../../core/utilities/constants/core.constants";

interface IProps {
  imageUrl: string;
  title: string;
  id: string;
  type: string;
  description: string;
}

function HomePageListCard({ imageUrl, title, id, type, description }: IProps) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      onClick={() =>
        navigate(
          `${
            type === "artist"
              ? FileRoutes.ARTIST
              : type === "album"
              ? FileRoutes.ALBUM
              : FileRoutes.PLAYLIST
          }/${id}`
        )
      }
    >
      <figure className={`${type === "artist" ? "rounded-full" : "md:rounded-md"} overflow-hidden`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover aspect-square"
        />
      </figure>
      <h6 className="text-white font-normal tracking-wide mt-4 w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
        {title}
      </h6>
      <p className="text-[#b3b3b3] text-sm line-clamp-2 mt-1">{description}</p>
    </div>
  );
}

export default HomePageListCard;
