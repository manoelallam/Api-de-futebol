import puppeteer from "puppeteer"

const browser = await puppeteer.launch({
    headless: true
});

async function ultimosjogos(time) {
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`https://www.placardefutebol.com.br/time/${time}/ultimos-jogos`);

    const texts = await page.$$eval('.match__md_card',
        divs => divs.map(({ innerText }) => innerText));

    const list = [];

    texts.forEach((t,v) => {
        list.push({campeonato: t.split('\n')[0], time_1: t.split('\n')[1], time_2: t.split('\n')[2], placar: t.split('\n')[3], data: t.split('\n')[4]})
    })

    await browser.close();
    return list;
}


async function proximosJogos(time) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`https://www.placardefutebol.com.br/time/${time}/proximos-jogos`);

    const texts = await page.$$eval('.match__md_card',
        divs => divs.map(({ innerText }) => innerText));

    const list = [];

    texts.forEach((t,v) => {
        list.push({campeonato: t.split('\n')[0], time_1: t.split('\n')[1], time_2: t.split('\n')[2], data: t.split('\n')[3], horario: t.split('\n')[4]})
    })

    await browser.close();
    return list;
}

async function campeonatos(campeonato) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`https://www.placardefutebol.com.br/${campeonato}`);

    const tabela = await page.$$eval('#livescore > div:nth-child(3) > div > div > table',
        divs => divs.map(({ innerText }) => innerText));

    const list = [];

    const tabelaSplitada = Array.from(tabela.values()).toString().split('\n')
    tabelaSplitada.shift()

    tabelaSplitada.forEach(t => {
        const linha = t.split('\t')
        list.push({posicao: linha[0], time: linha[1], pontos: linha[2], jogos: linha[3], vitorias: linha[4],
            empates: linha[5], derrotas: linha[6], saldo_gols: linha[7]})
    })

    await browser.close();
    return list;
}

export {
    ultimosjogos,
    proximosJogos,
    campeonatos
};
