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

### Teste Completo da API com Swagger
```bash
http://localhost:8080/swagger-ui/index.html#/
```
### API Endpoints

```bash
GET /api/v1/vms - Lista todas as VMs

POST /api/v1/vms - Cria nova VM

PUT /api/v1/vms/{id} - Atualiza VM
```

### VERIFICAÇÃO DO BANCO DE DADOS
###### sudo -u postgres psql -d vm_manager -c "SELECT * FROM vms;"
```bash
 id | cpu |        data_criacao        | disco | memoria |          nome           | status  
----+-----+----------------------------+-------+---------+-------------------------+---------
  2 |   4 | 2026-01-20 10:52:39.256493 |   200 |       8 | Servidor Banco de Dados | STOPPED
  1 |   8 | 2026-01-20 10:52:48.528684 |   500 |      16 | VM Atualizada           | RUNNING
```
