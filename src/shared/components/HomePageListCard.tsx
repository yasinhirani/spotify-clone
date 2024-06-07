import { useNavigate } from "react-router-dom";
import { FileRoutes } from "../../core/utilities/constants/core.constants";

interface IProps {
  imageUrl: string;
  title: string;
  id: string;
  type: string;
}

function HomePageListCard({ imageUrl, title, id, type }: IProps) {
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
      className="bg-[#b3b3b3] bg-opacity-10 p-3 rounded-md"
    >
      <figure className="rounded-md overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.3)]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover aspect-square"
        />
      </figure>
      <h6 className="text-white font-semibold text-sm tracking-wide mt-4 w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
        {title}
      </h6>
    </div>
  );
}

export default HomePageListCard;
