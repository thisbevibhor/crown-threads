import "./category-item.styles.scss";
import PropTypes from "prop-types";

function CategoryItem({ category }) {
	const { title, imageUrl, id } = category;

	return (
		<div className="category-container" key={id}>
			<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="category-body-container">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
}

CategoryItem.propTypes = {
	category: PropTypes.shape({
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired,
};

export default CategoryItem;
