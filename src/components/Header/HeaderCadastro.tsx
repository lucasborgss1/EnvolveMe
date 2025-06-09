import * as S from "./styles";
import * as SU from "../utils/utils";
import { Link } from "react-router-dom";

export const HeaderCadastro: React.FC = () => {
    return (
        <S.StyledHeader>
            <div className="header">
                <Link to={{ pathname: "/" }}>
                    <S.StyledLogo>
                        <img src="/src/aesthetic-landscape-reflection-background-hd-wallpaper-sr10012410.jpg" alt="" />
                        <SU.StyledFontH1>EnvolveMe</SU.StyledFontH1>
                    </S.StyledLogo>
                </Link>

                <S.StyledNav></S.StyledNav>
            </div>
        </S.StyledHeader>
    );
};
