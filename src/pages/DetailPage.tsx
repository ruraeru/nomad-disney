import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchDetail } from "../api";
import { CharacterImage } from "./Home";
import styled from "styled-components";
import Loading from "../components/Loading";

interface IDetail {
    films: string[]
    id: number;
    imageUrl: string;
    name: string;
    sourceUrl: string;
}
type RouteParams = {
    id: string;
}

export default function DetailPage() {
    const { id } = useParams() as RouteParams;
    const navigate = useNavigate();
    const { isLoading, data } = useQuery<IDetail>(["Detail", id], () => fetchDetail(id));
    const onBack = () => {
        navigate(-1)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container>
            <BackButton onClick={onBack}>
                <span>&larr;</span>
            </BackButton>
            <ContentWrapper>
                <Profile>
                    <CharacterImage src={data?.imageUrl} alt={data?.name} />
                    <p>{data?.name}</p>
                    <a href={data?.sourceUrl}>More Info</a>
                </Profile>
                <FilmList>
                    {data?.films.map((film, index) => (
                        <FilmItem key={index}>
                            {film}
                        </FilmItem>
                    ))}
                </FilmList>
            </ContentWrapper>
        </Container>
    )
}

const BackButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 20px;
    margin: 20px 0;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateX(-5px);
    }

    span {
        display: inline-block;
    }
`;

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    min-height: 100vh;

    border: 1px solid white;
    border-radius: 1rem;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 2px 4px, rgba(255, 255, 255, 0.3) 0px 7px 13px -3px, rgba(255, 255, 255, 0.2) 0px -3px 0px inset;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    p {
        font-size: 36px;
        color: white;
        margin: 0;
        text-align: center;
    }
    a {
        color: white;
        text-decoration: none;
        padding: 8px 16px;
        border: 2px solid white;
        border-radius: 20px;
        transition: all 0.2s ease;

        &:hover {
            background-color: white;
            color: black;
        }
    }
`;

const FilmList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    /* flex-direction: column; */
    justify-content: center;
    gap: 10px;

    max-width: 600px;
`;

const FilmItem = styled.li`
    background-color: white;
    color: black;
    padding: 8px 16px;
    border-radius: 15px;
    font-size: 14px;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 20px;
`;