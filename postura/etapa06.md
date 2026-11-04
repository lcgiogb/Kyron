# Tutorial Etapa 6: CSS e a Gamificação (Condicionamento Operante)

Na etapa final do nosso MVP, transformamos uma simples análise geométrica em um **Jogo Educativo (Serious Game)**. E fizemos isso adicionando estética e pontuação!

### O que estamos aprendendo?
1. **O poder do CSS (UI/UX)**: Adicionamos um estilo "Cyberpunk" com fontes em neon (`text-shadow`) e um layout em tela cheia (`100vw, 100vh`). Estética não é apenas beleza, é **Imersão**. O aluno se sente engajado pelo visual.
2. **Sistema de Vida (HP)**: A variável `hp` é nossa ferramenta de condicionamento operante de Skinner:
   - **Reforço Positivo/Cura**: Se a postura for excelente, ganha-se `+0.3` de vida por frame.
   - **Punição Leve**: Postura duvidosa causa `-0.2` de dano por frame.
   - **Punição Severa**: Postura péssima causa `-0.5` de dano contínuo.
3. **Restrições Matemáticas (`Math.max/min`)**: Para evitar bugs numéricos (como ficar com HP infinito ou vida negativa tipo -50), nós "prendemos" o valor do HP forçadamente entre 0 e 100 a cada segundo.
4. **Game Over**: Se a vida cair a zero, uma *flag* `gameOver` paralisa o dano e informa severamente o usuário para se levantar e se alongar, forçando a pausa ergométrica que ele estaria ignorando.
