const Footer = () => {
	return (
		<footer>
			<div class="footer-top">
				<div class="container">
					<div class="row">
						<div class="col-lg-4">
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
						<div class="col-md-4">
							<h4>Connect</h4>
							<ul class="social-icon">
								<li>
									<a href="#">
										<i class="fa fa-facebook" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i class="fa fa-instagram" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="#">
										<i class="fa fa-twitter" aria-hidden="true"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="footer-bottom">
				<div class="container">
					<div class="row">
						<div class="col-sm-5">
							<p class="copyright">
								© 2023 | Made with <i class="fa-solid fa-heart"> </i> By
								Roshanell Fracisco
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
