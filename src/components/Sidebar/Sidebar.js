import React, { useContext, useRef, useState } from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSearch,
    SSearchIcon,
    SSidebar,
    SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import { logoSVG } from "../../assets";

import {
    AiOutlineApartment,
    AiOutlineLeft,
    AiOutlineSearch,
    AiOutlineAudit,
} from "react-icons/ai";
import { MdStorefront, MdDialpad, MdOutlineAnalytics } from "react-icons/md";

import { ThemeContext } from "./../../App";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const searchRef = useRef(null);
    const { setTheme, theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const searchClickHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // search functionality
        }
    };

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
                <img src={logoSVG} alt="logo" />
            </SLogo>
            <SSearch
                onClick={searchClickHandler}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
                <SSearchIcon>
                    <AiOutlineSearch />
                </SSearchIcon>
                <input
                    ref={searchRef}
                    placeholder="Search"
                    style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
                />
            </SSearch>
            <SDivider />
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, do not display */}
                                {!!notification && (
                                    <SLinkNotification>{notification}</SLinkNotification>
                                )}
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label }) => (
                <SLinkContainer key={label}>
                    <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            <STheme>
                {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
                <SThemeToggler
                    isActive={theme === "dark"}
                    onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                >
                    <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};

const linksArray = [
    {
        label: "Swap",
        icon: <CgArrowsExchangeAlt />,
        to: "/",
        notification: 0,
    },
    {
        label: "Farm",
        icon: <MdStorefront />,
        to: "/statistics",
        notification: 0,
    },
    {
        label: "Launchpad",
        icon: <MdDialpad />,
        to: "/customers",
        notification: 0,
    },
    {
        label: "NeoBit Statistics",
        icon: <MdOutlineAnalytics />,
        to: "/diagrams",
        notification: 0,
    },
];

const secondaryLinksArray = [
    {
        label: "Contract",
        to: "/diagrams",
        icon: <AiOutlineAudit />,
    },
    {
        label: "Audit",
        to: "/diagrams",
        icon: <AiOutlineAudit />,
    },
    {
        label: "Whitepaper",
        to: "/diagrams",
        icon: <AiOutlineAudit />,
    },
];

export default Sidebar;
