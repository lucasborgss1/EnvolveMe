import * as S from "./styles";
import * as SU from "../utils/utils";
import { Link } from "react-router-dom";

export const HeaderHome: React.FC = () => {
    const scrollToSobre = () => {
        const section = document.getElementById("sobre");
        section?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <S.StyledHeader>
            <div className="header">
                <Link to={{ pathname: "/" }}>
                    <S.StyledLogo>
                        <img src="/aesthetic-landscape-reflection-background-hd-wallpaper-sr10012410.jpg" alt="" />
                        <SU.StyledFontH1>EnvolveMe</SU.StyledFontH1>
                    </S.StyledLogo>
                </Link>
                <S.StyledNav>
                    <ul>
                        <li>
                            <SU.StyledFontLink onClick={scrollToSobre}>{}</SU.StyledFontLink>
                        </li>
                        <li>
                            <SU.StyledFontLink href="">Conta</SU.StyledFontLink>
                        </li>
                    </ul>
                </S.StyledNav>
            </div>
        </S.StyledHeader>
    );
};
