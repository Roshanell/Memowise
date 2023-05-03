import { Link } from "react-router-dom";
// footer
// TO DO: fix spacing for about us and connect so that it is centered
//  put about us on the left and connect to the right
//  change color for contact us icons to greysih
const Footer = () => {
	return (
		<footer>
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<ul>
								<Link className="nav-link" to="/">
									Home
								</Link>
								<Link className="nav-link" to="/aboutMe">
									About Me
								</Link>
								<Link className="nav-link" to="/FAQS">
									FAQs
								</Link>
							</ul>
						</div>
						<div className="col-md-4">
							<h4>Connect</h4>
							<ul className="social-icon">
								<li>
									<a href="https://github.com/Roshanell">
										<i class="fa-brands fa-github"></i>
									</a>
								</li>
								<li>
									<a href="https://www.linkedin.com/in/roshanellfrancisco/">
										<i class="fa-brands fa-linkedin-in"></i>
									</a>
								</li>
								<li>
									<a href="https://roshanell.netlify.app/">
										<i class="fa-solid fa-globe"></i>
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
					<p>Logo goes here</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
