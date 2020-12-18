const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express();
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}))


const themes = [
    {name: 'none', color: 'black', background: 'white', height: 150},
    {name: 'dark', color: 'red', background: 'black', height: 150},
    {name: 'ligth', color: 'yellow', background: 'red', height: 150},
    {name: 'reguler', color: 'blue', background: 'orange', height: 150},
]
app.get('/', (req, res)=>{
    console.log(req.body);
    res.send("<h1>Welclome Plesee Enter 'themes'</h1>")
})

app.post('/themes', (req, res) => {
    const themeName = req.body.themeName;
    const selectedTheme = themes.find(theme => theme.name === themeName);
    req.session.theme = selectedTheme;
    res.send(selectedTheme);

})

app.get('/themes', (req, res) => {
    const themesNames = themes.map(theme => theme.name);
    let theme = req.session.theme;
    if (!theme) {
        theme = themes.find(theme => theme.name === 'none');
        req.session.theme = theme;
    }
    res.send({ themesNames, theme });
})

app.listen(8080, () => console.log("Server is listening to port 8080"));