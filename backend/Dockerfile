FROM openjdk:17-jdk-alpine

WORKDIR /stazy

COPY target/backend-0.0.1-SNAPSHOT.jar stazy.jar

EXPOSE 8080

CMD ["java", "-jar", "stazy.jar"]