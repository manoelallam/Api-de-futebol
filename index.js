import express from 'express'
import {ultimosjogos, proximosJogos, campeonatos} from './jogos.js'

const api = express()

api.get('/campeonato/:campeonato', async (req, res) => {
    const retorno = await campeonatos(req.params.campeonato)
    res.send(retorno)
    res.end()
})

api.get('/proximosJogos/:time', async (req, res) => {
    const retorno = await proximosJogos(req.params.time)
    res.send(retorno)
    res.end()
})

api.get('/ultimosjogos/:time', async (req, res) => {
    const retorno = await ultimosjogos(req.params.time)
    res.send(retorno)
    res.end()
})

api.listen(3000, () => console.log("Servidor foi iniciado"))