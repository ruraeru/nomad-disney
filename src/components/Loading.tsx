import styled from "styled-components"

export default function Loading() {
    return (
        <Text>Loading...</Text>
    )
}

const Text = styled.p`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    font-size: 48px;
`