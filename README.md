# Development
pasos para levanta la app en desarrollo

1. levantar la base de datos 
```
docker compose up -d


```

2. Renombrar el .env.template. a .env 
3. Reemplazar las variables de entorno
4. ejecutar el comando ``` npm install ```
5. ejecutar el comando ``` npm run dev ```
6. ejecutar estos comandos de prisma
``` 
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos local] (http://localhost:3000/api/seed)

# Prisma commands
```

npx prisma init
npx prisma migrate dev

```


# Prod


# Stage