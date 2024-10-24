import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"
import { fetchDetail } from "../api";
import { Img } from "./Home";
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
    console.log(useParams());
    const { isLoading, data } = useQuery<IDetail>(["Detail", id], () => fetchDetail(id));
    console.log(data)
    return (
        <Container>
            <Btn>
                <Link to={"/"}>&larr;</Link>
            </Btn>
            {isLoading
                ? <Loading />
                : (
                    <Wrapper>
                        <Profile>
                            <Img src={data?.imageUrl} alt={data?.name} />
                            <p>{data?.name}</p>
                            <a href={data?.sourceUrl}>More Info</a>
                        </Profile>
                        <div>
                            <ul>
                                {data?.films.map((film, index) => <li key={index}>{film}</li>)}
                            </ul>
                        </div>
                    </Wrapper>
                )}
        </Container>
    )
}

const Btn = styled.button`
    border: none;
    background-color: inherit;
    font-size: 18px;
    color: white;
    margin: 50px 0 20px 0;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* margin-top: 50px; */
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 36px;
        margin: 10px 0 10px 0;
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    margin: 0 auto;
    justify-content: center;
    width: 300px;
    ul {
        display: flex;
        /* align-content: center; */
        justify-content: center;
        flex-wrap: wrap;
        /* width: 290px; */
    }
    li {
        width: fit-content;
        background-color: white;
        padding: 3px;
        margin: 5px;
        
        border-radius: 5px;
        color: black;
    }
`