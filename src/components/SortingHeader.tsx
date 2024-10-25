import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

export default function SortingHeader() {
    const alphabetLinks = useMemo(() =>
        alphabet.map((el) => (
            <AlphabetItem key={el}>
                <StyledLink to={`/${el}`}>
                    <Letter>{el}</Letter>
                </StyledLink>
            </AlphabetItem>
        )),
        []
    );

    return <AlphabetList>{alphabetLinks}</AlphabetList>
}

const AlphabetList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    gap: 10px;
    margin: 20px 0;
    padding: 20px;
    
    border-radius: 10px;
    
    background-color: aliceblue;
`;

const AlphabetItem = styled.li`
    text-align: center;
    min-width: 60px;
`;

const StyledLink = styled(Link)`
    display: block;
    
    padding: 8px;
    
    color: black;
    
    transition: all 0.2s ease;
    border-radius: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const Letter = styled.span`
    font-size: 36px;
`;