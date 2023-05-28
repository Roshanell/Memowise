import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer>
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<ul className="footer-nav-links">
								<Link className="header-nav-link" to="/">
									Home
								</Link>
								{/* <Link className="header-nav-link" to="/aboutMe">
									About Me
								</Link>
								<Link className="header-nav-link" to="/FAQS">
									FAQs
								</Link> */}
							</ul>
						</div>
						<div className="col-md-4">
							<h4>Connect</h4>
							<ul className="social-icon">
								<li>
									<a href="https://github.com/Roshanell">
										<i className="fa-brands fa-github"></i>
									</a>
								</li>
								<li>
									<a href="https://www.linkedin.com/in/roshanellfrancisco/">
										<i className="fa-brands fa-linkedin-in"></i>
									</a>
								</li>
								<li>
									<a href="https://roshanell.netlify.app/">
										<i className="fa-solid fa-globe"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-sm-5">
							<p className="copyright">
								© 2023 | Made with <i className="fa-solid fa-heart"> </i> By
								Roshanell Francisco
							</p>
						</div>
					</div>
				</div>
				<div>
					<p>
						<img className="logo"src="https://i.imgur.com/hpUeyGf.png" />
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
