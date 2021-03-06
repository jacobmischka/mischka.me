import React from 'react';

import Layout from '../components/Layout.js';

export default function About() {
	return (
		<Layout>
			<img src="/images/me.jpg" alt="Me"
				width="300" height="300"
				className="profile-photo" />
			<p>
				I graduated from the University of Wisconsin-Whitewater
				with a BBA and a major in Management in Computer Systems.
			</p>
			<p>
				I am currently working as a software developer at
				the <a href="http://www.mcw.edu">
					Medical College of Wisconsin
				</a>.
			</p>
			<p>
				<a href="/resume.pdf">
					My most recent resume
				</a>
			</p>
		</Layout>
	);
}
