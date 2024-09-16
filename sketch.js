//variáveis da bolinha
let xBolinha = 100;// posição do eixo x dabolinha
let yBolinha = 200;//posição do eixo y da bolinha
let diametro = 20;//tamanho da bolinha
let raio = diametro / 2;// tamanho na bolinha

//variáveis do oponente
let xRaqueteOponente = 585;// posição da raquete do eixo x
let yRaqueteOponente = 150;// posição da raquete do eixo y

//velocidade da bolinha
let velocidadeXBolinha = 6;// velocidade x da bolinha
let velocidadeYBolinha = 6;// velocidade y da bolinha

//variáveis da raquete
let xRaquete = 5;// raquete x
let yRaquete = 150;//raquete y
let raqueteComprimento = 10;// comprimento da raquete
let raqueteAltura = 90;// altura da raquete

//placar do jogo
let meusPontos = 0;// meus pontos 
let pontosDoOponente = 0;// pontos do oponente


//sons do jogo
let raquetada;// começar raquete
let ponto;//contabilizar pontos
let trilha;//trilha

let colidiu = false;//colidiu

function setup() {// configurações
  createCanvas(600, 400);//tamanho da tela
    trilha.loop();//repitir infinitamente
}

function draw() {// desenho de função
    background(0);// cor de fundo
    mostraBolinha();// mostre a bolinha
    movimentaBolinha();//movimento da bolinha
    verificaColisaoBorda();// verifique a colisão na borda
    mostraRaquete(xRaquete, yRaquete);// mostre a raquete y e x
    movimentaMinhaRaquete();// movimento da raquete
    verificaColisaoRaquete(xRaquete, yRaquete);// verificando colisão da raquete x e y
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);// verifique colisão da raquete x e y do oponente
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);// mostre raquete x e y do oponente
    movimentaRaqueteOponente();// movimento da raquete do oponente
    incluiPlacar() // incluir o placar
    marcaPonto();// marcar pontos
}
function mostraBolinha() {// mostrar bolinha
  circle(xBolinha, yBolinha, diametro);//diametro da bolinha
}

function movimentaBolinha() {// movimento da bolinha
  xBolinha += velocidadeXBolinha;// volocidade da bolinha x
  yBolinha += velocidadeYBolinha;// volocidade da bolinha y
}

function verificaColisaoBorda() {//verifique colisão da borda
  if (xBolinha + raio > width || xBolinha - raio < 0) {// tamanho da bolinha
    velocidadeXBolinha *= -1;// velocidade x da bolinha
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {// tamanho da bolinha y
    velocidadeYBolinha *= -1;// velocidade da bolinha y
  }
}

function mostraRaquete(x,y) {// mostre raquete x e y
    rect(x, y, raqueteComprimento, raqueteAltura);// comprimento da raquete x e y
}

function movimentaMinhaRaquete() {// movimento da raquete
  if(keyIsDown(UP_ARROW)) {// a chave está para baixo
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {//a chave está para baixo
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {// verifique colisão da raquete
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {//raquete pra bolinha
    velocidadeXBolinha *= -1;// velocidade da bolinha x
     raquetada.play();//inicia raquete
  }
}

function verificaColisaoRaquete(x, y) {// verifique colisão da raquete x e y
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){// colidiu
        velocidadeXBolinha *= -1;// velocidade da bolinha x
        raquetada.play();
  }
}

function movimentaRaqueteOponente(){// movimento da raquete do oponente
    if (keyIsDown(87)){// A tecla está para baixo
        yRaqueteOponente -= 10;//raquete do oponente y desce
    }
    if (keyIsDown(83)){//raquete pra cima
        yRaqueteOponente += 10;
    }
}


function incluiPlacar(){// incluir placar
  stroke(255)
    textAlign(CENTER);// texto
    textSize(16);// tamanho do texto
    fill(color(255,140, 0));// cor de preenchimento
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);// meus pontos
    fill(color(255,140, 0));// cor de preenchimento
    rect(450, 10, 40, 20);
    fill(255);//preencher
    text(pontosDoOponente, 470, 26);// pontos do oponente



}


function marcaPonto() {// marcar ponto
    if (xBolinha > 590) {
        meusPontos += 1;// meus pontos
        ponto.play();
    }
    if (xBolinha < 10) {// preencher bolinha x
        pontosDoOponente += 1;// pontos do oponente
        ponto.play();// confirma o ponto
    }
}


function preload(){// pré-carregamento
  trilha = loadSound("trilha.mp3");// carregar som
  ponto = loadSound("ponto.mp3");// carregar som
  raquetada = loadSound("raquetada.mp3");// carregar som
}

