# Tutorial Etapa 4: Geometria e Calibração (Matemática Aplicada)

Como um computador sabe que alguém tem má postura? Precisamos transformá-la em números! Para isso, focamos apenas em alguns pontos: os ombros e as orelhas.

### O que estamos aprendendo?
1. **Conversão de Coordenadas**: O MediaPipe devolve os pontos em "porcentagem" (0.0 até 1.0). Se multiplicarmos esse valor pela largura ou altura do canvas, descobrimos o ponto exato em Pixels.
2. **Ponto Médio**: Usamos a função `getMidpoint` (soma o X dos dois ombros e divide por dois) para achar o centro do peito. Fazemos o mesmo para orelhas para achar o centro da cabeça.
3. **Teorema de Pitágoras**: A função `calculateDistance` calcula a distância entre o centro da cabeça e o centro do peito, encontrando assim o "tamanho" visível do pescoço.
4. **O Botão de Calibração**: Uma boa postura é relativa à altura e distância de cada pessoa da câmera. Quando o usuário se senta reto e clica em "Calibrar", nós tiramos uma "foto matemática" salvando o tamanho do pescoço dele na variável `baselineNeckLength`.
