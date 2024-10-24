import { useQuery } from "react-query";
import { fetchCharacters } from "./api";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ICharType {
  id: number;
  imageUrl: string;
  name: string;
}

function Home() {
  const { isLoading, data } = useQuery<ICharType[]>("allCharacter", fetchCharacters);
  return (
    <Container>
      <Header>
        <Title>Disney Characters</Title>
      </Header>
      <Wrapper>
        {isLoading ? <strong>Loading</strong> : (
          data?.slice(0, 50).map(char => (
            <Link to={`/character/${char.id}`} key={char.id}>
              <Character>
                <Img src={char.imageUrl} alt={char.name} />
                <p>{char.name}</p>
              </Character>
            </Link>
          ))
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100px;
`;

const Title = styled.h1`
  font-size: 48px;
  align-self: center;
  color: white;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* column-gap: 100px; */
`;

export const Img = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 5px;
`;

const Character = styled.div`
  /* width: 250px; */
  padding: 5px;
  &:hover {
    background-color: white;
    color: black;
    border-radius: 20px;
  }
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Home;
