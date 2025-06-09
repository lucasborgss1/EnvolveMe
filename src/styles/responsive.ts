import { css } from 'styled-components';

export const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
};

export const media = {
    mobile: `@media (max-width: ${breakpoints.tablet})`,
    tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.laptop})`,
    laptop: `@media (min-width: ${breakpoints.laptop}) and (max-width: ${breakpoints.desktop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
};

export const mobileFirst = {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    laptop: `@media (min-width: ${breakpoints.laptop})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
};

export const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`;

export const gridResponsive = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
`;

export const containerPadding = css`
    padding: 1rem;
    ${mobileFirst.tablet} {
        padding: 1.5rem;
    }
    ${mobileFirst.laptop} {
        padding: 2rem;
    }
`;

export const responsiveFont = css`
    font-size: 1rem;
    ${mobileFirst.tablet} {
        font-size: 1.1rem;
    }
    ${mobileFirst.laptop} {
        font-size: 1.2rem;
    }
`;

export const responsiveSpacing = css`
    margin: 1rem;
    ${mobileFirst.tablet} {
        margin: 1.5rem;
    }
    ${mobileFirst.laptop} {
        margin: 2rem;
    }
`;

export const hideOnMobile = css`
    ${media.mobile} {
        display: none;
    }
`;

export const showOnMobile = css`
    display: none;
    ${media.mobile} {
        display: block;
    }
`;

export const responsiveContainer = css`
    width: 100%;
    max-width: ${breakpoints.mobile};
    margin: 0 auto;
    padding: 0 1rem;

    ${mobileFirst.tablet} {
        max-width: ${breakpoints.tablet};
    }

    ${mobileFirst.laptop} {
        max-width: ${breakpoints.laptop};
    }

    ${mobileFirst.desktop} {
        max-width: ${breakpoints.desktop};
    }
`; 