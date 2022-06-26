import Notification from "../components/Notification";

function Home() {
	return (
		<>
			<Notification />
			<main>
				<h1 className="title">
					The React Framework <br />
					for Production
				</h1>
				<p className="description">
					Next.js gives you the best developer experience with all the features you need for production:
					hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.
					No config needed.
				</p>
				<div className="btns">
					<a href="#learn" className="btn">
						Start learning
					</a>
					<a href="#documentation" className="invert-btn">
						Documentation
					</a>
				</div>
			</main>
		</>
	);
}

export default Home;
