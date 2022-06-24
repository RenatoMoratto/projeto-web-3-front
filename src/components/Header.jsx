import LogoVercel from "./LogoVercel";
import LogoNext from "./LogoNext";
import "../style/menu.css";
import "../style/mobile-menu.css";

function Header({ setShowModal }) {
	return (
		<>
			<div className="top-bar">
				<div className="inner">
					<LogoVercel />
					<a
						href="https://vercel.com/solutions/nextjs?utm_source=next-site&utm_medium=banner&utm_campaign=next-website"
						target="_blank"
						rel="noopener noreferrer"
					>
						<p>
							Deploy <b>Next.js</b> in seconds →
						</p>
					</a>
				</div>
			</div>
			<header>
				<div>
					<div className="mobile-top">
						<a href="/">
							<LogoNext />
						</a>
						<div className="rigth">
							<button className="login btn" onClick={() => setShowModal(true)}>
								Login
							</button>

							<div className="menu-hamburguer-wrapper">
								<input id="menu-hamburguer" type="checkbox" />

								<label htmlFor="menu-hamburguer">
									<div className="menu">
										<span className="hamburguer"></span>
									</div>
								</label>

								<nav id="mobile-menu">
									<ul>
										<li>
											<a href="#showcase">Showcase</a>
										</li>
										<li>
											<a href="#docs">Docs</a>
										</li>
										<li>
											<a href="#blog">Blog</a>
										</li>
										<li>
											<a href="#analytics">Analytics</a>
										</li>
										<li>
											<a href="#Commerce">Commerce</a>
										</li>
										<li>
											<a href="#examples">Examples</a>
										</li>
										<li>
											<a href="#enterprise">Enterprise</a>
										</li>
										<li>
											<a href="#github">GitHub</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
					<nav className="desktop-top">
						<a href="/">
							<LogoNext />
						</a>
						<a href="#showcase">Showcase</a>
						<a href="#docs">Docs</a>
						<a href="#blog">Blog</a>
						<a href="#analytics">Analytics</a>
						<a href="#examples">Examples</a>
						<a href="#enterprise">Enterprise</a>
						<button className="login btn" onClick={() => setShowModal(true)}>
							Login
						</button>
						{/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
						<a>
							<i className="fa fa-github" style={{ fontSize: "24px" }}></i>
						</a>
					</nav>
				</div>
			</header>
		</>
	);
}

export default Header;
