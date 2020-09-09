# Recuperação de senha

**RF (Requisitos funcionais)**

- O usuario deve poder recuperar sua senha informando o seu email;
- O usuario deve receber um email com instruções de recuperação de senha;
- O usuario deve poder resetar sua senha;

**RNF (Requisitos não funcionais)**

- Utilizar mailtrap (emails fakes) para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN (Regras de negocio)**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar sua senha;'


# Atualização do perfil

**RF (Requisitos funcionais)**

- O usuario deve poder atualizar seu nome, email e senha;

**RN (Regras de negocio)**

- O usuario não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o user deve informar a senha antiga;
- Para atualizar sua senha, o user precisa confirmar sua nova senha;

# Painel do prestador

**RF (Requisitos funcionais)**

- O user deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder vizualizar as notificações não lidas;

**RNF (Requisitos não funcionais)**

- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando socket.io;

**RN (Regras de negocio)**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF (Requisitos funcionais)**

- O user deve poder listar todos os prestadores de serviço cadastrados;
- O user deve poder vizualiar os dias de um mês com pelo menos um horário disponível de um prestador;
- O user deve poder listar horarios disponiveis em um dia especifico de um prestador;
- o user deve poder realizar um novo agendamento com um prestador;

**RNF (Requisitos não funcionais)**

- A listagem de prestadores devem ser armazenada em cache;

**RN (Regras de negocio)**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h - 18h (primeiro horario 18h, último às 17h);
- O user não pode agendar em um horário já ocupado;
- O user não pode agendar em um horário que já passou;
- O user não pode agendar serviços consigo mesmo;
