// footer
const Footer = () => {
	return (
		<footer>
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<h4>About us</h4>
							<ul>
								<li className="footer-link">
									<a href="#">Home</a>
								</li>
								<li className="footer-link">
									<a href="#">About Us</a>
								</li>
								<li className="footer-link">
									<a href="#">Our services</a>
								</li>
								<li className="footer-link">
									<a href="#">Contact Us</a>
								</li>
							</ul>
						</div>
						<div className="col-md-4">
							<h4>Connect</h4>
							<ul className="social-icon">
								<li>
									<a href="#">
										<i className="fa fa-facebook" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-instagram" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i className="fa fa-twitter" aria-hidden="true"></i>
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
								Roshanell Fracisco
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
