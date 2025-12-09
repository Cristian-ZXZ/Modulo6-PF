techhelpdesk/
├─ src/
│  ├─ auth/
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.ts
│  │  ├─ jwt.strategy.ts
│  │  └─ local.strategy.ts (opcional)
│  ├─ users/
│  │  ├─ users.module.ts
│  │  ├─ users.service.ts
│  │  ├─ users.controller.ts
│  │  ├─ entities/user.entity.ts
│  │  └─ dto/
│  ├─ tickets/
│  │  ├─ tickets.module.ts
│  │  ├─ tickets.service.ts
│  │  ├─ tickets.controller.ts
│  │  ├─ dto/
│  │  └─ entities/ticket.entity.ts
│  ├─ categories/
│  ├─ clients/
│  ├─ technicians/
│  ├─ common/
│  │  ├─ decorators/ (@Roles, @CurrentUser)
│  │  ├─ guards/ (RolesGuard, JwtAuthGuard)
│  │  ├─ interceptors/ (TransformInterceptor)
│  │  └─ filters/ (HttpExceptionFilter)
│  ├─ database/
│  │  └─ seeders/
│  ├─ main.ts
│  └─ app.module.ts
├─ test/
│  ├─ tickets.spec.ts
├─ .env.example
├─ docker-compose.yml
├─ Dockerfile
├─ ormconfig.ts (o TypeORM config in app)
├─ package.json
└─ README.md
