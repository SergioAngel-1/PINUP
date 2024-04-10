import PropTypes from 'prop-types';

const Card = ({ title, imageUrl, moreUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md pb-6 text-center relative">
      <div className="relative overflow-hidden rounded-t-lg">
        <img src={imageUrl} alt={title} className="w-full transition-opacity duration-300 hover:opacity-70" />
        <div className="absolute inset-0 bg-secondary opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      <h2 className="text-lg font-semibold mt-4 text-fourth">{title}</h2>
      <a href={moreUrl} className="text-text italic font-medium hover:underline">Ver más</a>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired, 
  imageUrl: PropTypes.string.isRequired,
  moreUrl: PropTypes.string.isRequired
};

export default Card;