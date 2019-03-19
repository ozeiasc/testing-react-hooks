import React, {useState, useEffect} from 'react';

export default function App() {
    const [repositories, setRespositories] = useState([]);

    // corresponde ao componentDidMount
    useEffect(async () => {
        const response = await fetch('https://api.github.com/users/ozeiasc');
        const data = await response.json();

        setRespositories(data)
    }, []);

    // corresponde ao componentDidUpdate
    // nesse formato, a função somente será executada se houver alteração
    // nas informações da variável 'repositories'
    useEffect(() => {
        const filtered = repositories.filter(repo => repo.favorite);
        document.title = `Você tem ${filtered.length} favoritos`;
    }, [repositories]);

    function handleFavorite(id) {
        const newRepositories = repositories.map(repo => {
            return repo.id = id ? {...repo, favorite: !repo.favorite} : {...repo}
        });

        setRespositories(newRepositories);
    }

    return (
        <ul>
            {repositories.map(repo => (
                <li key={repo.id}>
                    {repo.name}
                    {repo.favorite && <span>Favorito</span>}
                    <button onClick={() => handleFavorite(repo.id)}>Favorite</button>
                </li>
            ))}
        </ul>
    )
}
