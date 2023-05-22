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
	];
	return (
		<>
			<div className="categories-container">
				{categories.map(({ title }) => (
					<div className="category-container">
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
