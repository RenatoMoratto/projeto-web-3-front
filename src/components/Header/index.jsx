import LogoVercel from "../Logo/LogoVercel";
import LogoNext from "../Logo/LogoNext";
import HeaderButton from "./HeaderButton";
import HeaderLink from "./HeaderLink";

import "../../style/menu.css";
import "../../style/mobile-menu.css";

function Header({ onLoginClick, onPageChange }) {
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
							<HeaderButton onClick={onLoginClick} />

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
											<HeaderLink title="Home" onClick={onPageChange} />
										</li>
										<li>
											<HeaderLink title="Posts" onClick={onPageChange} />
										</li>
										<li>
											<HeaderLink title="Quotes" onClick={onPageChange} />
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
						<HeaderLink title="Home" onClick={onPageChange} />
						<HeaderLink title="Posts" onClick={onPageChange} />
						<HeaderLink title="Quotes" onClick={onPageChange} />
						<a href="#analytics">Analytics</a>
						<a href="#examples">Examples</a>
						<a href="#enterprise">Enterprise</a>
						<HeaderButton onClick={onLoginClick} />
					</nav>
				</div>
			</header>
		</>
	);
}

export default Header;
