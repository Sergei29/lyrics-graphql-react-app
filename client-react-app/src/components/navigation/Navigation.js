import React from "react";
import { NavLink } from "react-router-dom";

//styles:
import "./Navigation.scss";

const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact>
						Homepage
					</NavLink>
				</li>
				<li>
					<NavLink to="/songs" exact>
						Songs
					</NavLink>
				</li>

				<li>
					<NavLink to="/songs/new">New Song</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
