# Sistema de Cadastro de Máquinas Virtuais

## Tecnologias
- Backend: Java 17, Spring Boot, PostgreSQL
- Frontend: Angular 19, Bootstrap

## Configuração

### Banco de Dados
1. Instalar PostgreSQL
2. Criar database: `vm_manager`
3. Configurar application.properties

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
### Frontend
```bash

```
### Acessar o Banco de Dados PostgreSQL via terminal
```bash
psql -h localhost -p 5432 -U postgres -d vm_manager
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

###  Atualização (UPDATE)
```bash
UPDATE vms
SET status = 'RUNNING'
WHERE id = 2;
```

## 📖 Documentação da API

A API está documentada com Swagger/OpenAPI 3.0.

### Acessar documentação:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs


