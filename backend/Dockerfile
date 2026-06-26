# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /app

# Copy maven wrapper and pom
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make wrapper executable and download dependencies
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline -B

# Copy source and build
COPY src src
RUN ./mvnw package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar backend.jar

# Copiar las fotos semilla (uploads) a la imagen de produccion
COPY --from=build /app/src/main/resources/uploads ./src/main/resources/uploads

# Expose port and run
EXPOSE 8080
CMD ["java", "-jar", "backend.jar"]
