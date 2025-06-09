import styled from 'styled-components';

export const Container = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
`;

export const Section = styled.section`
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);

    h2 {
        margin-bottom: 1rem;
        color: #a78bfa;
    }

    p {
        opacity: 0.8;
        margin-bottom: 2rem;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

export const Card = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 8px;
    color: #fff;
    
    h3 {
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    p {
        margin: 0.5rem 0;
        font-size: 1rem;
    }
`;

export const ChartContainer = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    h3 {
        margin-bottom: 1.5rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
    }
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
`;

export const ListItem = styled.li`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 4px;
    color: #fff;
    font-size: 1.1rem;
    text-align: center;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const StatCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);

    h3 {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.9);
    }

    p {
        font-size: 2rem;
        color: #a78bfa;
        margin: 0;
    }
`; 