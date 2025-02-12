import React from "react";
import {
  faUserFriends,
  faHandHoldingUsd,
  faEnvelope,
  faStar,
  faCog,
  faQuestionCircle,
  faHome,
  faLock,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container, Nav } from "react-bootstrap";

import NavbarItem from "./NavbarItem";
import TalBox from "./TalBox";
import Logo from "src/components/logo";

const icon = (i) => <FontAwesomeIcon icon={i} />;

const TalNavbar = (props) => {
  const {
    feedPath,
    talentPath,
    portfolioPath,
    messagesPath,
    tradePath,
    settingsPath,
    helpPath,
    admin,
    adminPath,
    talent,
    editTalentPath,
  } = props;

  return (
    <Navbar
      collapseOnSelect
      className="flex-lg-column py-3 lg-h-100 border-right border-bottom"
      expand="lg"
    >
      <Container className="flex-lg-column align-items-lg-start lg-h-100 my-0 my-lg-3">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="flex-lg-column w-100 lg-h-100 justify-content-lg-between"
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto flex-lg-column w-100">
            <NavbarItem url={feedPath} exact>
              {icon(faHome)} Home
            </NavbarItem>
            <NavbarItem url={talentPath}>
              {icon(faUserFriends)} Talent
            </NavbarItem>
            <NavbarItem url={portfolioPath}>
              {icon(faHandHoldingUsd)} Portfolio
            </NavbarItem>
            <NavbarItem url={messagesPath}>
              {icon(faEnvelope)} Messages
            </NavbarItem>
            <NavbarItem url={tradePath}>{icon(faStar)} Trade $TAL</NavbarItem>
            {admin && (
              <NavbarItem url={adminPath}>{icon(faLock)} Admin</NavbarItem>
            )}
          </Nav>
          <Nav className="flex-lg-column w-100 mt-3 mt-lg-0">
            {talent && (
              <NavbarItem url={editTalentPath} exact>
                {icon(faIdCard)} My Profile
              </NavbarItem>
            )}
            <NavbarItem url={settingsPath} exact>
              {icon(faCog)} Settings
            </NavbarItem>
            <NavbarItem url={helpPath} exact target={"self"}>
              {icon(faQuestionCircle)} Contact Us
            </NavbarItem>
            <TalBox price="0.02" variance="+0%" />
            <p className="text-danger">
              Live on <strong>Ropsten Network.</strong>
            </p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TalNavbar;
