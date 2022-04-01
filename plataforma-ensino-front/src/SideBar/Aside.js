import React, { useCallback } from 'react';
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaWineBottle, FaUserAlt, FaTruckMoving, FaBriefcase, FaFolderPlus, FaCog, FaChartLine, FaRegComments, FaRecycle, FaCamera, FaDatabase } from 'react-icons/fa';
import Logo from '../assets/images/enterscience.png';
import sidebarBg from './assets/bg1.jpg';
import { Link, NavLink } from 'react-router-dom';
import { MdCopyright } from 'react-icons/md';
import { useSelector } from 'react-redux';


const Aside = props => {

	const {
		image,
		collapsed,
		toggled,
		handleToggleSidebar,
		handleCollapsedChange = () => { },
		...other
	} = props;

	// #084808
	let user = useSelector(store => store.AppReducer.user);

	return (
		<ProSidebar
			image={image ? sidebarBg : false}
			collapsed={collapsed}
			toggled={toggled}
			breakPoint="md"
			style={{ position: 'fixed' }}
			onToggle={handleToggleSidebar}
			{...other}
		>
			<SidebarHeader style={{ background: '#222d32', height: 70 }}>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: "center",
						alignItems: 'center',
						minHeight: "70px"
					}}
				>
					{collapsed == true && <span>
						<div
							style={{
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundImage: `url(${Logo})`,
								width: "2em",
								height: "2em"
							}}

						/>

					</span>}
					{collapsed == false && <i>
						{/* <img className="img-fluid" src={Logo} alt="" height="100" style={{ height: '40px' }} /> */}
						<div
							style={{
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundImage: `url(${Logo})`,
								width: "2em",
								height: "2em"
							}}

						/>
					</i>}
				</div>
			</SidebarHeader>

			<SidebarContent style={{ background: '#222d32' }}>
				<Menu iconShape="circle">
					<MenuItem
						icon={<FaChartLine />}
					>

						<NavLink end to="/"
							style={isActive => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: "white"
							})}>{'Dashboard'}</NavLink>
					</MenuItem>

					<MenuItem
						icon={<FaCamera />}
					>

						<NavLink end to="/"
							style={isActive => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: "white"
							})}>{'Câmera inteligente'}</NavLink>
					</MenuItem>
					<MenuItem
						icon={<FaDatabase />}
					>

						<NavLink end to="/"
							style={isActive => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: "white"
							})}>{'Ciência de dados'}</NavLink>
					</MenuItem>

				</Menu>

			</SidebarContent>

			<SidebarFooter style={{ textAlign: 'center', background: '#222d32' }}>
				<div
					className="sidebar-btn-wrapper"
					style={{
						padding: '20px 24px',
					}}
				>
					<a
						href="https://rtsaudeintegrativa.com.br/site/"
						target="_blank"
						className="sidebar-btn"
						rel="noopener noreferrer"
					>
						<MdCopyright />
						<span> {'Copyright 2022 Enterscience'}</span>
					</a>
				</div>
			</SidebarFooter>
		</ProSidebar>
	);
};

export default Aside;
