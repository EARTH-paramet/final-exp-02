import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
  text-decoration: none;
  color: rgb(152, 152, 152);

  &.active {
    color: #f4d03f;
    span {
      color: rgb(152, 152, 152);
    }
  }
`;
