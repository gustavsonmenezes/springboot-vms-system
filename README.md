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