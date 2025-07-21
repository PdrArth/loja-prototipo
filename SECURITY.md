# Política de Segurança

## Versões Suportadas

Atualmente, oferecemos suporte de segurança para as seguintes versões:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | :white_check_mark: |
| < 1.0  | :x:                |

## Relatando uma Vulnerabilidade

A segurança da Loja Valentina é uma prioridade. Se você descobrir uma vulnerabilidade de segurança, pedimos que nos informe de forma responsável.

### Como Reportar

1. **NÃO** abra uma issue pública no GitHub
2. Envie um email para: **security@lojavalentina.com**
3. Inclua o máximo de informações possível:
   - Descrição detalhada da vulnerabilidade
   - Passos para reproduzir o problema
   - Impacto potencial
   - Versão afetada
   - Qualquer prova de conceito (se aplicável)

### O que Esperar

- **Confirmação**: Responderemos em até 48 horas
- **Investigação**: Investigaremos o problema em até 7 dias
- **Correção**: Trabalharemos para corrigir vulnerabilidades críticas em até 30 dias
- **Divulgação**: Coordenaremos a divulgação pública após a correção

### Programa de Recompensas

Atualmente não oferecemos recompensas monetárias, mas reconheceremos publicamente pesquisadores responsáveis (com permissão).

## Medidas de Segurança Implementadas

### Frontend
- ✅ Headers de segurança (CSP, HSTS, X-Frame-Options)
- ✅ Sanitização de inputs
- ✅ Validação de dados no cliente e servidor
- ✅ Proteção contra XSS
- ✅ Proteção CSRF

### Infraestrutura
- ✅ HTTPS obrigatório
- ✅ Compressão segura
- ✅ Rate limiting (via Vercel)
- ✅ Monitoramento de logs
- ✅ Backup automático

### Dados
- ✅ Não armazenamos dados sensíveis no localStorage
- ✅ Tokens JWT com expiração
- ✅ Validação de entrada rigorosa
- ✅ Sanitização de saída

## Configurações de Segurança

### Headers HTTP
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https:;
```

## Boas Práticas para Desenvolvedores

### Ao Contribuir
1. Nunca commite credenciais ou chaves de API
2. Use variáveis de ambiente para dados sensíveis
3. Valide todas as entradas do usuário
4. Sanitize todas as saídas
5. Use HTTPS em todas as comunicações
6. Mantenha dependências atualizadas

### Ao Fazer Deploy
1. Configure variáveis de ambiente seguras
2. Use secrets do GitHub para CI/CD
3. Monitore logs de segurança
4. Configure alertas para atividades suspeitas
5. Faça backups regulares

## Dependências de Segurança

Monitoramos regularmente nossas dependências para vulnerabilidades conhecidas:

```bash
# Verificar vulnerabilidades
npm audit

# Corrigir automaticamente
npm audit fix
```

## Contato

Para questões relacionadas à segurança:
- **Email**: security@lojavalentina.com
- **Resposta**: Dentro de 48 horas
- **Idiomas**: Português, Inglês

## Agradecimentos

Agradecemos aos seguintes pesquisadores de segurança por suas contribuições responsáveis:

- *Nenhum relatório recebido ainda*

---

**Última atualização**: 21 de julho de 2025
