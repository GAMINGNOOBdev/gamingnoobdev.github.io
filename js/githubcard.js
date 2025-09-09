function loadGithubCard()
{
    const username = 'GAMINGNOOBdev';
    const cardContainer = document.getElementById('github-profile-card');

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(user => {
            const cardHtml = `
                <p onclick="location.href='${user.html_url}'" style="cursor: pointer; width: 512px;">
                    <img src="${user.avatar_url}" alt="${user.login}" style="width: 64px; height=64px; float: left; padding-right: 10px;"/>
                    <b style="font-size: xx-large;">${user.name || user.login}</b><br/>
                    Followers: ${user.followers} | Public Repos: ${user.public_repos}<br/>
                    <br/>
                    ${user.bio || 'No bio available.'}
                </p>
            `;
            cardContainer.innerHTML = cardHtml;
        })
        .catch(error => {
            cardContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
            console.error('Error fetching GitHub profile:', error);
        });
}
