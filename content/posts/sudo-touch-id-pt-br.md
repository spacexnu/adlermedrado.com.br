---
title: "Sudo com Touch ID no macOS"
date: 2024-06-16T09:12:42-03:00
draft: false
tags:
  - "tip"
  - "dica"
  - "mac"
  - "seguranca"
---

Configurar o sudo para usar o Touch ID no macOS Sonoma em apenas alguns passos é muito fácil.

Localize o arquivo /etc/pam.d/sudo_local.template e faça uma cópia conforme o exemplo abaixo:

```bash
sudo cp /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local
```

Em seguida, edite o arquivo e remova o caractere # do início da linha 3, ele deve ficar assim:

```bash
# sudo_local: arquivo de configuração local que sobrevive a atualizações do sistema e é incluído para sudo
# descomente a linha a seguir para habilitar o Touch ID para sudo
auth sufficient pam_tid.so
```

#### Passos detalhados para editar o arquivo
Para editar o arquivo, use um editor de texto como nano ou vim. Por exemplo, com o nano:

```bash
sudo nano /etc/pam.d/sudo_local
```

Faça as alterações necessárias e salve o arquivo (Ctrl+O, Enter, Ctrl+X no nano).

## Benefícios do uso do Touch ID com sudo
* Conveniência: Utilizar o Touch ID elimina a necessidade de digitar sua senha repetidamente, tornando o processo mais rápido e fácil.
* Segurança: O Touch ID adiciona uma camada extra de segurança, garantindo que apenas usuários autorizados possam executar comandos sudo.

### Solução de problemas comuns
**Touch ID não funciona:**

* Verifique se o arquivo /etc/pam.d/sudo_local está configurado corretamente.
* Certifique-se de que o seu macOS está atualizado e que o Touch ID está configurado nas preferências do sistema.

### Versões do macOS
Esta configuração foi testada no macOS Sonoma, mas também pode funcionar em outras versões recentes do macOS. Verifique a documentação do seu sistema para confirmar.

### Considerações de segurança
Usar o Touch ID para sudo é geralmente seguro e conveniente. No entanto, é importante garantir que o seu Touch ID esteja configurado corretamente e que apenas usuários autorizados tenham acesso ao seu Mac.

Como uso muito o sudo, essa configuração é muito conveniente para mim.
Espero que essa dica seja útil para você.
