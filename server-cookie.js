// cookie - saved on browser (client)
// npm i cookie-parser


const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post('/themes', (req, res)=>{
    const themeName = req.body.themeName;
    const selectedTheme = themes.find(theme=> theme.name === themeName);
    res.cookie('theme', themeName, {maxAge: 1000*60*60}) // 1000= 1 second *60 = 1 miniute *60 = 1 hour // maxAge:0 > forever
    res.send(selectedTheme);
})

app.delete('/themes-cookie', (req, res)=>{
    const themeName = req.cookies.theme;
    res.clearCookie('theme');
    res.send(themes.find(theme=> theme.name === themeName));
})

app.get('/themes', (req, res)=>{
    const themesNames = themes.map(theme => theme.name);
    res.send(themesNames);
})


app.listen(8080, ()=> console.log("Server is listning to PORT 8080"))



// not forget "node server.js" (or different name of a file.js)
// or "nodemon server.js" (before, update "npm i nodmon")

// try:
// {
//     "themeName": "dark"
// }
// in postman > post