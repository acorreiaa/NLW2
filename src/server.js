const proffys = [
    {
        name: "Amanda Correia",
        avatar: "https://accounts.google.com/SignOutOptions?hl=pt-BR&continue=https://www.google.com%3Fhl%3Dpt-BR",
        whatsapp: "(11) 95473-1328",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Ciências",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Luana Correia",
        avatar: "https://avatars3.githubusercontent.com/u/51122375?s=400&u=89a57a78839cd36a24cbdea65763c9a8598f2300&v=4",
        whatsapp: "(11) 95474-1328",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Ciências",
        cost: "20",
        weekday: [3],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"

]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

//Funcionalidades

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}
function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    //console.log (variável a ser consultada)
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    //se tiver dados (data)
    const isNotEmpaty = Object.keys(data).length > 0
    if (isNotEmpaty) {

        data.subject = getSubject(data.subject)
        //adicionar data a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }

    //se não, mostrar a página
    return res.render("give-classes.html", { subjects, weekdays })
}

//servidor
const express = require('express')
const server = express()

//configurar nunjucks (template engine)
const nunjucks = require("nunjucks")
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
    //configurar arquivos estáticos (css, scripts, images)
    .use(express.static("public"))
    //rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .listen(5500)