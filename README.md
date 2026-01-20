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
cd frontend
npm install
ng serve
```

### API Endpoints

```bash
GET /api/v1/vms - Lista todas as VMs

POST /api/v1/vms - Cria nova VM

PUT /api/v1/vms/{id} - Atualiza VM
```

### Teste Completo da API

```bash
curl -I http://localhost:8080/swagger-ui/index.html
```

### Listar VMs
```bash
curl http://localhost:8080/api/vms
```

### Buscar por ID
```bash
curl http://localhost:8080/api/vms/1
```

### Criar outra VM
```bash
curl -X POST http://localhost:8080/api/vms \
-H "Content-Type: application/json" \
-d '{"nome": "Servidor Banco de Dados", "cpu": 4, "memoria": 8, "disco": 200}'
```

###  Atualizar a VM 1
```bash
curl -X PUT http://localhost:8080/api/vms/1 \
-H "Content-Type: application/json" \
-d '{"nome": "VM Atualizada", "cpu": 8, "memoria": 16, "disco": 500}'
```

### Mudar status
```bash
# Para a VM
curl -X PUT http://localhost:8080/api/vms/1/stop

# Suspende
curl -X PUT http://localhost:8080/api/vms/1/suspend

# Inicia novamente
curl -X PUT http://localhost:8080/api/vms/1/start
```
### Validações
```bash
# Nome muito curto
curl -X POST http://localhost:8080/api/vms \
  -H "Content-Type: application/json" \
  -d '{"nome": "VM", "cpu": 2, "memoria": 4, "disco": 50}'

# CPU negativa
curl -X POST http://localhost:8080/api/vms \
  -H "Content-Type: application/json" \
  -d '{"nome": "Servidor Teste", "cpu": 0, "memoria": 4, "disco": 50}'
```

### VERIFICAÇÃO DO BANCO DE DADOS
###### sudo -u postgres psql -d vm_manager -c "SELECT * FROM vms;"
```bash
 id | cpu |        data_criacao        | disco | memoria |          nome           | status  
----+-----+----------------------------+-------+---------+-------------------------+---------
  2 |   4 | 2026-01-20 10:52:39.256493 |   200 |       8 | Servidor Banco de Dados | STOPPED
  1 |   8 | 2026-01-20 10:52:48.528684 |   500 |      16 | VM Atualizada           | RUNNING
```
