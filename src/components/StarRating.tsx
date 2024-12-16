const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = index < rating ? "text-yellow-400" : "text-gray-300";
    return (
      <svg
        key={index}
        className={`w-5 h-5 fill-current ${fill}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l2.121 6.485L21 9.243l-5.485 3.772L17.657 21 12 17.318 6.343 21l1.142-8.985L3 9.243l6.879-.758L12 2z" />
      </svg>
    );
  });
  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
