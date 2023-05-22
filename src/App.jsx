// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	// const [count, setCount] = useState(0);
	const categories = [
		{
			title: "Hats",
			id: 1,
		},
		{
			title: "Jackets",
			id: 2,
		},
		{
			title: "Sneakers",
			id: 3,
		},
		{
			title: "Men",
			id: 4,
		},
		{
			title: "Women",
			id: 5,
		},
	];
	return (
		<>
			<div className="categories-container">
				{categories.map(({ title }) => (
					<div className="category-container" key={categories.id}>
						{/* { <img /> } */}
						<div className="category-body-container">
							<h2>{title}</h2>
							<p>Shop Now</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
