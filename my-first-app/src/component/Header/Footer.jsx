import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #EA6659;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 Tüm Hakları Saklıdır.</p>
    </FooterContainer>
  );
};

export default Footer;
