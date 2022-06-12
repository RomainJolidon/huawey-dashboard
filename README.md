# huawey-dashboard
Un little school project made in HarmonyOS.

## Contents

* [Introduction](#Introduction)
* [Getting Started](#Getting-Started)
* [Installation](#Installation)
* [Configuration](#Configuration)
* [Environment Requirements](#Environment-Requirements)

## Introduction
HmsAnalyticsKitDemo provides an example of integrating Analytics Kit into an `HAP`. It illustrates how to collect predefined events and custom events to improve user engagement and user preference.
[Learn more about Analytics Kit](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/introduction-0000001050745149).

## Getting Started

For details, please refer to the links below:

[Development Guide](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/introduction-0000001050745149)

[API Reference](https://developer.huawei.com/consumer/en/doc/development/HMSCore-References/overview-0000001077819400)

In this example, we'll demonstrate how to use the Analytics SDK for HarmonyOS by using the Gradle build system.

First, download HmsAnalyticsKitDemo by cloning this repository or downloading the compressed package. 

In HUAWEI DevEco Studio, click **Open...** and select **HmsAnalyticsKitDemo**.

You can use the **gradlew build** command to build the project.

Create an app in AppGallery Connect, obtain the **agconnect-services.json** file, and add the file to your project. In addition, you need to generate the signing certificate fingerprint, add the certificate file to the project, and add the configuration to the **build.gradle** file. Click [here](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/introduction-0000001050745149) to learn more.

## Installation
1. Use HUAWEI DevEco Studio to open the decompressed project.
2. Run the following command in the **entry** directory:
    ```bash
    npm install
    ```

## Configuration
1. Create an app in AppGallery Connect and obtain the app configuration file **agconnect-services.json**. In HUAWEI DevEco Studio, switch to the **Project** view and move the **agconnect-services.json** file to the **entry** directory.
2. Change **bundleName** in the **config.json** file in the **entry** directory to the HAP name obtained in the first step.
3. Change **bundlename** in the **app.js** file in the **js** directory to the HAP name obtained in the first step.

## Environment Requirements
Hardware:
1. A computer (desktop or laptop)
2. A Huawei phone used for app debugging
  
Software:
1. Analytics Kit 6.3.0
2. HarmonyOS 2.0.0 (API level 4) or later
3. HUAWEI DevEco Studio
4. JDK version: 1.8 or later
