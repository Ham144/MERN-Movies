import React from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Menu = () => {
	return (
		<div className="w-full h-full relative">
			<div className="dropdown fixed right-5 bottom-20  ">
				<label tabIndex={0} className="btn m-1 ">
					<MdMenu className={`lg:size-11 size-5`} />
				</label>
				<ul
					tabIndex={0}
					className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 translate-y-[-200px] translate-x-[-120px]"
				>
					<li>
						<Link to={"/profile"} className="btn m-1">
							Profile
						</Link>
					</li>
					<li>
						<Link to={"/genre"} className="btn m-1">
							Genre
						</Link>
					</li>
					<li>
						<Link to={"/dashboard"} className="btn m-1">
							Dashboard
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Menu;
