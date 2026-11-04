# Tutorial Etapa 5: Lógica e Feedbacks Visuais

Temos a calibração, mas como o sistema reage? Usaremos Condicionais (`if`/`else`) para construir uma Máquina de Estados baseada em Proporções.

### O que estamos aprendendo?
1. **A Razão (`neckRatio`)**: Em vez de checar os "pixels exatos" que o pescoço encolheu, fazemos uma divisão matemática: `Tamanho Atual / Tamanho Calibrado`. 
   - Se a pessoa projeta a cabeça em direção ao monitor (famosa corcunda do computador), no vídeo o tamanho visível do pescoço encolhe!
   - Se o resultado for 1.0, o pescoço está 100% igual.
   - Se for 0.8, o pescoço encolheu cerca de 20%.
2. **Mudança de Cores e Interface**: Se o `neckRatio` cair abaixo de `0.92` (92%), disparamos um aviso amarelo. Se cair abaixo de `0.85` (85%), o estado entra em crítico (vermelho). 
3. **Mudança Dinâmica**: Repare que passamos a variável `skeletonColor` para o `drawConnectors`. Isso faz com que a cor do esqueleto do usuário mude instantaneamente reagindo ao seu corpo no mundo real.
