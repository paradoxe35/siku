# Siku - Automated Ad Distribution Platform

<div align="center">
    <img src="./public/favicon/android-chrome-192x192.png" width="20%" />
</div>

Siku is an ad distribution platform that automates the delivery of online ads. The goal of this project was to streamline an otherwise manual and tedious process while still maintaining high performance and accountability.

## Key Features

-   Automated ad distribution that allows advertisers to reach wider audiences faster
-   Performance monitoring to validate each ad impression
-   Ad tracing through assigned codes for every ad delivered
-   Scalability to send millions of ads per day without slow down or loss

## Key Technology Choices

### Back-end

-   **Laravel**: High-performance PHP framework optimized for web scaling
-   **NodeJS**: Enables real-time websocket communication

### Front-end

-   **ReactJS**: Fast rendering of monitoring dashboards
-   **Webpack**: Module bundling optimizes the frontend build process

### Data & Delivery

-   **MariaDB**: Robust, scalable SQL database
-   **Redis**: In-memory data store powers the ad queue

### Infrastructure

-   **Ansible**: Automates the provisioning and deployment of new servers
