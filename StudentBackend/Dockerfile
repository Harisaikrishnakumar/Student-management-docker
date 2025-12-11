# ===== BACKEND BUILD STAGE =====
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy backend source code
COPY . .

# Build Spring Boot JAR
RUN mvn clean package -DskipTests

# ===== RUNTIME STAGE =====
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
