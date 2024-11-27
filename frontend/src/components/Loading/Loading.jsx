import "../../styles/Loading.css";

const Loading = () => {
	return (
		<div className="loading-container">
			<div className="spinner">
				{Array.from({ length: 12 }).map((_, index) => (
					<div key={index} className={`dot dot-${index + 1}`}></div>
				))}
			</div>
			<p>Loading...</p>
		</div>
	);
};

export default Loading;
