import { useUserContext } from "../../contexts/UserContext";

function Main() {
    const context = useUserContext();

    return (
        <div>
            <h1>Hello, {context.user?.username}</h1>
            <button onClick={context.signOut}>Sign Out</button>
        </div>
    )
}

export default Main;