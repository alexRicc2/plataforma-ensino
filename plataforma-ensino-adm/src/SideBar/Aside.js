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

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaWineBottle, FaUserAlt, FaTruckMoving, FaBriefcase, FaFolderPlus, FaCog, FaChartLine, FaRegComments, FaRecycle, FaCamera, FaDatabase, FaBook, FaEvent } from 'react-icons/fa';
import {BsFillCalendarEventFill} from 'react-icons/bs'
import Logo from './assets/logoAdm.svg';
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
			
			<SidebarHeader style={{ height: 70 }}>
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

			<SidebarContent style={{  }}>
				<Menu iconShape="circle">
					<MenuItem
						icon={<FaChartLine />}
					>

						<NavLink end to="/"
							style={({isActive}) => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: isActive ? "white":"#ADADAD"
							})}>{'Dashboard'}</NavLink>
					</MenuItem>

					<SubMenu
						icon={<FaBook />}
						title="Cursos"
					>
						<MenuItem>
						<NavLink end to="/cursos/lista"
							style={({isActive}) => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: "white"
							})}>{'Todos os cursos'}</NavLink>
						</MenuItem>

						<MenuItem>
						<NavLink end to="/categorias"
							style={({isActive}) => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: "white"
							})}>{'Categorias'}</NavLink>
						</MenuItem>

						<MenuItem>
						<NavLink end to="/tags/lista"
							style={({isActive}) => ({
								fontWeight: isActive ? "bold" : "inherit"
								, color: "white"
							})}>{'Tags'}</NavLink>
						</MenuItem>

					</SubMenu>
					<SubMenu
						icon={<BsFillCalendarEventFill/>}
						title="Eventos"
					>
						<MenuItem>
							<NavLink end to="/"
								style={({isActive}) => ({
									fontWeight: isActive ? "bold" : "inherit"
									, color: "white"
								})}>{'Cadastrar evento'}</NavLink>
						</MenuItem>
						<MenuItem>
							<NavLink end to="/"
								style={({isActive}) => ({
									fontWeight: isActive ? "bold" : "inherit"
									, color: "white"
								})}>{'Hackatons'}</NavLink>
						</MenuItem>


					</SubMenu>

				</Menu>

			</SidebarContent>

			<SidebarFooter style={{ textAlign: 'center'}}>
				<div
					className="sidebar-btn-wrapper"
					style={{
						padding: '20px 24px',
					}}
				>
					<a
						href="#"
						target="_blank"
						className="sidebar-btn"
						rel="noopener noreferrer"
					>
						<MdCopyright />
						<span> {'Copyright 2022 Alex'}</span>
					</a>
				</div>
			</SidebarFooter>
		</ProSidebar>
	);
};

export default Aside;
