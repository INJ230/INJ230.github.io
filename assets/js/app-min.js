"use strict";let deck=[],players=[],dealer={},currentPlayerIndex=0,gameMode="";const suits=["Clubs","Diamond","Hearts","Spades"],ranks=["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];function createDeck(){deck=[],suits.forEach(e=>{ranks.forEach(t=>{let a=parseInt(t);"Ace"===t&&(a=1),["Jack","Queen","King"].includes(t)&&(a=10),deck.push({name:`${e}-${t}`,value:a})})}),deck=shuffle(deck)}function shuffle(e){for(let t=e.length-1;t>0;t--){let a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e}function dealCard(){return deck.pop()}function changeView(e){let t=document.getElementById("app"),a=document.getElementById("resultModal");switch(t.innerHTML="",a.classList.add("hidden"),e){case"home":showHome();break;case"rules":showRules();break;case"credits":showCredits();break;case"gameSetup":showGameSetup();break;case"blackjackTable":startRound()}}function showHome(){let e=`
        <div class="text-center">
            <h1 class="text-5xl font-bold mt-8 text-yellow-400">Blackjack Casino</h1>
            <button class="button mt-8 px-4 py-2 bg-green-500 text-white rounded-md" onclick="changeView('gameSetup')">Jugar</button>
            <button class="button mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onclick="changeView('rules')">Reglas</button>
            <button class="button mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onclick="changeView('credits')">Cr\xe9ditos</button>
        </div>
    `;document.getElementById("app").innerHTML=e}function showRules(){let e=`
        <div class="mt-8">
            <h2 class="text-3xl font-bold text-yellow-400">Reglas del Blackjack</h2>
            <p class="mt-4">El objetivo es sumar 21 puntos o acercarse lo m\xe1s posible sin pasarse.</p>
            <p class="mt-2">Las cartas num\xe9ricas suman su valor, las figuras valen 10 y el As puede valer 1 u 11 seg\xfan convenga.</p>
            <button class="button mt-4 px-4 py-2 bg-green-500 text-white rounded-md" onclick="changeView('home')">Volver</button>
        </div>
    `;document.getElementById("app").innerHTML=e}function showCredits(){let e=`
        <div class="mt-8">
            <h2 class="text-3xl font-bold text-yellow-400">Cr\xe9ditos</h2>
            <p class="mt-4">Desarrollado por Erick Angel Tenorio Alcantara </p>
            <button class="button mt-4 px-4 py-2 bg-green-500 text-white rounded-md" onclick="changeView('home')">Volver</button>
        </div>
    `;document.getElementById("app").innerHTML=e}function showGameSetup(){let e=`
        <div class="mt-8">
            <h2 class="text-3xl font-bold text-yellow-400">Seleccionar Modo de Juego</h2>
            <div class="mt-4">
                <label class="block">N\xfamero de Jugadores (M\xe1ximo 4):</label>
                <input id="numPlayersInput" type="number" min="1" max="4" class="border border-gray-300 px-2 py-1 rounded-md text-black">
            </div>
            <div id="playerNames" class="mt-4"></div>
            <button id="startGameBtn" class="button mt-4 px-4 py-2 bg-green-500 text-white rounded-md">Iniciar Juego</button>
            <button class="button mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onclick="changeView('home')">Cancelar</button>
        </div>
    `;document.getElementById("app").innerHTML=e,document.getElementById("numPlayersInput").addEventListener("input",generatePlayerNameInputs),document.getElementById("startGameBtn").addEventListener("click",startGame)}function generatePlayerNameInputs(){let e=document.getElementById("numPlayersInput").value,t=document.getElementById("playerNames");t.innerHTML="";for(let a=1;a<=e;a++){let n=`
            <div class="mt-2">
                <label class="block">Nombre del Jugador ${a}:</label>
                <input type="text" id="player${a}Name" class="border border-gray-300 px-2 py-1 rounded-md text-black">
            </div>
        `;t.innerHTML+=n}}function startGame(){let e=document.getElementById("numPlayersInput").value;players=[];for(let t=1;t<=e;t++){let a=document.getElementById(`player${t}Name`).value||`Jugador ${t}`;players.push({name:a,cards:[],score:0,status:"playing"})}gameMode="multiplayer",changeView("blackjackTable")}function startRound(){createDeck(),dealer={name:"Crupier",cards:[],score:0,status:"playing"},players.forEach(e=>{e.cards=[],e.score=0,e.status="playing"}),currentPlayerIndex=0,updateScores(),updateGameUI()}function hit(){let e=players[currentPlayerIndex];e.cards.push(dealCard()),updateScore(e),e.score>21&&(e.status="busted",nextTurn()),updateGameUI()}function stand(){let e=players[currentPlayerIndex];e.status="standing",nextTurn()}function nextTurn(){if(++currentPlayerIndex>=players.length){dealerTurn();let e=document.getElementById("resultModal");e.offsetHeight,e.classList.remove("hidden")}}function dealerTurn(){let e=Math.min(...players.filter(e=>e.score<=21).map(e=>e.score));for(;dealer.score<17&&dealer.score<e;)if(dealerAction())dealer.cards.push(dealCard()),updateScore(dealer);else break;endRound()}function dealerAction(){return!0}function endRound(){updateGameUI(),setTimeout(showResults,600)}function showResults(){let e=document.getElementById("resultModal"),t=determineWinner();e.innerHTML=`
        <div class="mt-8">
            <h2 class="text-3xl font-bold text-yellow-400">Resultado de la Ronda</h2>
            <p class="mt-4">El ganador de la ronda es: 👑 ${t} 👑</p>
            <button class="button mt-4 px-4 py-2 bg-green-500 text-white rounded-md" onclick="startRound(); hideResultModal();">Nueva Partida</button>
            <button class="button mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onclick="changeView('home')">Salir al Men\xfa</button>
        </div>
    `,e.classList.remove("hidden")}function hideResultModal(){document.getElementById("resultModal").classList.add("hidden")}function determineWinner(){let e="",t=0,a=!1;return players.forEach(n=>{n.score<=21&&n.score>t?(t=n.score,e=n.name,a=!1):n.score===t&&(a=!0)}),dealer.score<=21&&dealer.score>t?(t=dealer.score,e=dealer.name,a=!1):dealer.score===t&&(a=!0),a&&(e="Todos perdieron"),e}function updateScore(e){e.score=calculateScore(e.cards)}function calculateScore(e){let t=e.reduce((e,t)=>e+t.value,0);return e.forEach(e=>{1===e.value&&t+10<=21&&(t+=10)}),t}function updateScores(){players.forEach(e=>{updateScore(e)}),updateScore(dealer)}function updateGameUI(){let e=`
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
                <h2 class="text-4xl font-bold text-yellow-400 text-center">Mesa de Blackjack</h2>
                <div class="mt-8">
                    <h3 class="text-2xl font-bold text-yellow-300">${dealer.name}:</h3>
                    <div id="dealerHand" class="flex mt-2 justify-center">
                        ${currentPlayerIndex>=players.length?dealer.cards.map(e=>`<img src="assets/cartas/${e.name}.png" class="card-img mr-2">`).join(""):'<img src="assets/cartas/card_back.png" class="card-img mr-2">'}
                    </div>
                    <div class="text-center mt-2 text-3xl font-bold text-yellow-300" id="dealerScore">${currentPlayerIndex>=players.length?dealer.score:"?"}</div>
                </div>
            </div>
    `;if(players.forEach((t,a)=>{let n=currentPlayerIndex===a&&"playing"===t.status?"bg-green-100":"standing"===t.status?"bg-gray-300":"busted"===t.status?"bg-red-300":"";e+=`
            <div class="col-span-2 md:col-span-1">
                <div class="mt-4 p-4 ${n}">
                    <h4 class="text-xl font-bold text-yellow-200">${t.name}:</h4>
                    <div id="player${a}Hand" class="flex mt-2 justify-center">
                        ${t.cards.map(e=>`<img src="assets/cartas/${e.name}.png" class="card-img mr-2">`).join("")}
                    </div>
                    <div class="text-center mt-2 text-3xl font-bold text-yellow-300" id="player${a}Score">${t.score}</div>
                    ${currentPlayerIndex===a&&"playing"===t.status?`
                    <div class="text-center">
                        <button class="button mt-2 px-4 py-2 bg-green-500 text-white rounded-md" onclick="hit()">Pedir Carta</button>
                        <button class="button mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded-md" onclick="stand()">Plantarse</button>
                    </div>
                    `:""}
                </div>
            </div>
        `}),e+=`
        </div>
    `,document.getElementById("app").innerHTML=e,currentPlayerIndex>=players.length){let t=document.getElementById("dealerHand");t.innerHTML="",dealer.cards.forEach(e=>{t.innerHTML+=`<img src="assets/cartas/${e.name}.png" class="card-img mr-2">`})}}window.onload=function(){changeView("home")};