<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Gateway

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Ejecutar `npm run start:dev`
5. Levantar Nats

#### Temario curso seccion 05 (02-products-app/client-gateway)

1. Envío de payload hacia el microservicio
2. Enviar mensajes del Gateway al microservicio
3. Configuración de excepciones
4. Independientes
5. Globales
6. Trabajar con observables y promesas en los mensajes


#### Temario curso seccion 08 (02-products-app/client-gateway)

1. Agregamos un modulo para la comunicacion con nats
2. Descargamos Nats a traves de docker.
3. Confuguracion de la comunicacion a traves de nats

### Nats
```
docker run -d --name nats-service -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
