import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Stars({ rating }) {
  // const stars = [];

  // for (let i = 1; i <= 5; i++) {
  //   if (i < rating) {
  //     stars.push(<FaStar key={i} />);
  //   } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
  //     stars.push(<FaStarHalf key={i} />);
  //   } else {
  //     stars.push(<FaRegStar key={i} />);
  //   }
  // }

  // return <>{stars}</>;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const startIndex = i + 1; // 星级从 1 开始
    if (startIndex <= rating) {
      return <FaStar key={startIndex} className="text-danger" />;
    } else if (startIndex === Math.ceil(rating) && rating % 1 >= 0.5) {
      return <FaStarHalfAlt key={startIndex} className="text-danger" />;
    } else {
      return <FaRegStar key={startIndex} className="text-secondary" />;
    }
  });

  return <>{stars}</>;
}
