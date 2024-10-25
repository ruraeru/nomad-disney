import { useQuery } from "react-query";
import { fetchCharacters } from "../api";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SortingHeader from "../components/SortingHeader";
import { useMemo } from "react";

interface ICharacter {
  id: number;
  imageUrl: string;
  name: string;
}

type RouteParams = {
  sortChar: string;
}

export default function Home() {
  const { sortChar } = useParams() as RouteParams;
  const { isLoading, data } = useQuery<ICharacter[]>("allCharacter", fetchCharacters);
  const filteredCharacters = useMemo(() => {
    if (!sortChar) return data;
    return data?.filter(char => char.name[0].toUpperCase() === sortChar.toUpperCase());
  }, [data, sortChar]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <Link to={"/"}>Disney Characters</Link>
        </Title>
      </Header>
      <SortingHeader />
      <CharacterGrid>
        {filteredCharacters?.map(char => (
          <Link to={`/character/${char.id}`} key={char.id}>
            <CharacterCard>
              <CharacterImage src={char.imageUrl} alt={char.name} />
              <p>{char.name}</p>
            </CharacterCard>
          </Link>
        ))}
      </CharacterGrid>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.header`
  padding: 2rem 0;
  text-align: center;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
`;

export const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;

  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;

const CharacterCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border-radius: 1rem;

  &:hover {
    background-color: white;
    color: black;
    transform: translateY(-5px);
  }

  p {
    text-align: center;
    font-weight: 500;
  }
`;

