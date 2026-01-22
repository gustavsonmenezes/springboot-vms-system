# Sistema de Cadastro de Máquinas Virtuais

Bem-vindo ao VMS System! Este projeto é uma aplicação Full Stack completa desenvolvida para facilitar o cadastro, monitoramento e controle de máquinas virtuais.
Este projeto foi construído com foco em escalabilidade, código limpo e facilidade de uso, servindo como demonstração técnica de competências em desenvolvimento moderno com Java/Spring Boot e Angular.

## 📋 Índice

1. Tecnologias Utilizadas
2. Pré-requisitos
3. Configuração do Banco de Dados
4. Como Executar o Backend
5. Como Executar o Frontend
6. Verificação e Testes SQL
7. Documentação da API (Swagger)

## Tecnologias utilizadas

| Camada | Tecnologia | Finalidade |
| --- | --- | --- |
| **Backend** | Java 17 | Linguagem robusta e tipada. |
| **Framework** | Spring Boot 3.2.2 | Agilidade no desenvolvimento da API. |
| **Persistência** | Spring Data JPA / Hibernate | Mapeamento objeto-relacional simplificado. |
| **Banco de Dados** | PostgreSQL | Banco de dados relacional de alta performance. |
| **Frontend** | Angular 19 | Framework moderno para interfaces reativas. |
| **Documentação** | Swagger (OpenAPI 3.0) | Interface interativa para testes de API. |


## 📌 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

• Java JDK 17+

•
Node.js 18+

•
PostgreSQL

•
Um navegador (Chrome, Firefox, Edge).





### Backend
Abra o terminal na pasta raiz do projeto e entre na pasta backend:
```bash
cd backend
```
```bash
./mvnw spring-boot:run
```

### Frontend
bra um novo terminal (mantenha o do backend rodando) e navegue até a pasta do frontend:
```bash
cd frontend/frontend-vms-system
```
Instale as dependências necessárias (apenas na primeira vez):
```bash
npm install
```

Inicie a interface web:

```bash
npm start
```
Abra o seu navegador e acesse: http://localhost:4200

### Acessar o Banco de Dados PostgreSQL via terminal
```bash
psql -h localhost -p 5432 -U postgres -d vm_manager
```
Verificar se as tabelas foram criadas:
```bash
\dt
```
Consultar máquinas virtuais cadastradas:
```bash
SELECT * FROM vms;
```


### Selecionar Todos os Dados da Tabela
```bash
vm_manager=# SELECT * FROM vms;
 id | cpu |        data_criacao        | disco | memoria |      nome       | status  
----+-----+----------------------------+-------+---------+-----------------+---------
  2 |   1 | 2026-01-20 22:37:13.82357  |     1 |       1 | teste           | STOPPED
  3 |   4 | 2026-01-21 13:09:34.568578 |   200 |       8 | Servidor Web    | RUNNING
  4 |   4 | 2026-01-21 13:10:41.924129 |   200 |       8 | Servidor Apache | RUNNING
  5 |  10 | 2026-01-21 13:13:34.983231 |  1200 |      64 | AWS             | RUNNING
```

### Inserir dados na tabela
```bash
INSERT INTO vms (cpu, disco, memoria, nome, status, data_criacao)
VALUES (4, 200, 8, 'Servidor Web', 'RUNNING', NOW());
```

## 📖 Documentação da API

A API está documentada com Swagger/OpenAPI 3.0.

### Acessar documentação:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs


### Decisões Técnicas e Boas Práticas

Este projeto foi desenvolvido com foco em manutenibilidade, escalabilidade e boas práticas de engenharia de software, simulando um ambiente real de desenvolvimento em equipe. As principais decisões técnicas adotadas estão descritas abaixo:

### Arquitetura e Organização do Código

Foi aplicada uma Arquitetura em Camadas (Clean Architecture), separando claramente as responsabilidades entre Controllers, Services e Repositories.
Essa abordagem facilita a manutenção, melhora a legibilidade do código e permite alterações nas regras de negócio sem impacto direto nas camadas de acesso a dados ou de exposição da API.

### Uso de DTOs (Data Transfer Objects)

A comunicação entre a API e o cliente é feita exclusivamente por meio de DTOs, evitando a exposição direta das entidades do banco de dados.
Essa estratégia aumenta a segurança, garante maior controle sobre os dados trafegados e permite alterações na estrutura do banco sem quebrar o contrato com o frontend.

### Tratamento Centralizado de Erros

Foi implementado um tratamento global de exceções, garantindo respostas padronizadas e informativas em casos de erro.
Isso facilita o consumo da API pelo frontend, que consegue identificar corretamente o tipo de falha e fornecer feedback adequado ao usuário.

### Validação de Dados

Utilizei Bean Validation para assegurar a integridade dos dados antes do processamento.
Entradas inválidas são bloqueadas automaticamente, evitando inconsistências no banco de dados e reduzindo a necessidade de validações manuais na lógica de negócio.

### Configuração de CORS

A aplicação conta com uma configuração explícita de CORS (Cross-Origin Resource Sharing), permitindo a comunicação segura entre frontend e backend mesmo quando executados em origens diferentes, seguindo as boas práticas de segurança web.


Desenvolvido por Gustavson Menezes