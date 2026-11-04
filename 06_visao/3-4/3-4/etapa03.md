# Tutorial Etapa 3: Identificando o Esqueleto Humano

A magia da Visão Computacional acontece aqui. A IA foi treinada com milhões de fotos para reconhecer 33 pontos específicos do corpo humano (como nariz, ombros, cotovelos e tornozelos).

### O que estamos aprendendo?
1. **O Objeto `poseLandmarks`**: Quando a função `onResults` é chamada, ela traz o objeto `results`. Se um corpo for detectado, `results.poseLandmarks` conterá um array com 33 coordenadas (X e Y) correspondentes às articulações da pessoa.
2. **Desenhando com `drawing_utils`**: Como seria exaustivo usar o Canvas manualmente para desenhar osso por osso, importamos a biblioteca `drawing_utils.js`. 
    - `drawLandmarks`: Pinta um círculo em cima de cada um dos 33 pontos.
    - `drawConnectors`: Traça uma linha (osso) entre os pontos. Ele utiliza a constante `POSE_CONNECTIONS`, que é basicamente um mapa que ensina ao computador: "Ligue o ponto do cotovelo ao ponto do pulso".
