const colors = [
    "#152d32",
	"#001f24",
	"#2f3b22",
	"#0f4539",
    "#011f4b",
    "#03396c",
    "#005b96"
]

async function getRepos() {
    const response = await fetch("https://api.github.com/users/tim-tm/repos")
    const repos = await response.json();
    repos.sort((a,b) => {
        return new Date(b.pushed_at) - new Date(a.pushed_at)
    });
    return repos;
}

async function printRepos() {
    const repos = await getRepos()
    let lastColor;
    for (let index = 0; index < repos.length; index++) {
        const element = repos[index]
        if (!element.fork && element.description != null) {
            const a = document.createElement("a")
            a.className = "repository"
            a.href = element.html_url
            const text = document.createTextNode(element.name + ": " + element.description)
            const image = document.createElement("i")
            image.className = "devicon-" + element.language.toLowerCase() + "-plain"
            
            a.appendChild(text)
            a.appendChild(image)
            if (element.license != null) {
                const license = document.createElement("a")
                license.className = "repoLicense"
                license.href = "https://choosealicense.com/licenses/" + element.license.key
                const licenseText = document.createTextNode(element.license.spdx_id)
                license.appendChild(licenseText)
                a.appendChild(license)
            }

            let randomColor = colors[Math.floor(Math.random()*colors.length)]
            while (randomColor === lastColor) {
                randomColor = colors[Math.floor(Math.random()*colors.length)]
            }
            a.style.setProperty("background-color", randomColor)
            lastColor = randomColor;

            const nav = document.getElementById("projNav")
            nav.appendChild(a)
        }
    }
}

printRepos()
