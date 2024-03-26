FROM openjdk:20-jdk
ARG JAR_FILE=target/*.jar
COPY ./target/dietTracker-0.0.1.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
