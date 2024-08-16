# Collectible Marketplace dApp

Welcome to the **Collectible Marketplace** dApp! This decentralized application is designed for creating, listing, and trading digital collectibles. Utilizing the Cartesi Rollups API, this dApp ensures secure and efficient management of collectibles and transactions. Dive in to discover how you can interact with the marketplace and contribute to its development.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
  - [Create Collectible](#create-collectible)
  - [Buy Collectible](#buy-collectible)
  - [List Collectibles](#list-collectibles)
  - [Get Collectible](#get-collectible)
- [Rollups API Integration](#rollups-api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Collectible Marketplace** is a decentralized platform where users can:

- **Create**: Mint new digital collectibles with unique attributes.
- **List**: Display available collectibles for sale.
- **Trade**: Purchase collectibles and transfer ownership.

Built on Cartesi Rollups, the dApp efficiently handles state management and transaction verification, ensuring a secure trading environment.

---

## Features

- **Create Collectible**: Add new items to the marketplace with detailed attributes.
- **List Collectibles**: View a comprehensive list of all available collectibles.
- **Buy Collectible**: Purchase items from the marketplace, updating their ownership status.
- **Get Collectible**: Retrieve specific details of any collectible by its ID.

---

## File Structure

```
src/
|-- controller/
|   |-- marketplaceController.js
|-- model/
|   |-- collectibleModel.js
|-- storage/
|   |-- collectibleStorage.js
|-- index.js
|-- utils.js
```

- **`src/controller/marketplaceController.js`**: Manages collectible-related operations such as creation, listing, and purchasing.
- **`src/model/collectibleModel.js`**: Defines the data structure and attributes of a collectible.
- **`src/storage/collectibleStorage.js`**: Handles the storage and retrieval of collectible data.
- **`src/index.js`**: Interfaces with the Cartesi Rollups API to process requests and manage state.
- **`src/utils.js`**: Provides utility functions for data conversion between hexadecimal and string formats.

---

## Installation

To get started with the Collectible Marketplace dApp:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/cheta-dot/Collectible-Marketplace-dApp
   cd collectible-marketplace
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

4. **Start the Application**

   Ensure the Rollup server is running and start the dApp:

   ```bash
   npm start
   ```

---

## Usage

### Create Collectible

- **Endpoint**: `/create_collectible`
- **Method**: `POST`
- **Payload**:
  
  ```json
  {
    "name": "Collectible Name",
    "description": "Description of the collectible",
    "price": 100
  }
  ```

- **Response**: 
  ```json
  {
    "success": true,
    "message": "Collectible created successfully!",
    "collectible": {
      "id": "unique-id",
      "name": "Collectible Name",
      "description": "Description of the collectible",
      "price": 100,
      "isSold": false,
      "owner": null
    }
  }
  ```

### Buy Collectible

- **Endpoint**: `/buy_collectible`
- **Method**: `POST`
- **Payload**:
  
  ```json
  {
    "collectibleId": "unique-id"
  }
  ```

- **Response**: 
  ```json
  {
    "success": true,
    "message": "Collectible bought successfully!",
    "collectible": {
      "id": "unique-id",
      "name": "Collectible Name",
      "description": "Description of the collectible",
      "price": 100,
      "isSold": true,
      "owner": "buyer-address"
    }
  }
  ```

### List Collectibles

- **Endpoint**: `/list_collectibles`
- **Method**: `GET`

- **Response**:
  ```json
  {
    "collectibles": [
      {
        "id": "unique-id",
        "name": "Collectible Name",
        "description": "Description of the collectible",
        "price": 100,
        "isSold": false,
        "owner": null
      }
      // ... more collectibles
    ]
  }
  ```

### Get Collectible

- **Endpoint**: `/collectible/{id}`
- **Method**: `GET`

- **Response**:
  ```json
  {
    "collectible": {
      "id": "unique-id",
      "name": "Collectible Name",
      "description": "Description of the collectible",
      "price": 100,
      "isSold": false,
      "owner": null
    }
  }
  ```

---

## Rollups API Integration

The **Collectible Marketplace** dApp leverages the Cartesi Rollups API to handle state changes and transaction management:

- **Advance State**: Processes collectible creation and purchasing requests.
- **Inspect State**: Retrieves lists of collectibles and details of specific items.

### Rollups Interaction

- **Advance State Endpoint**: Receives actions like creating and buying collectibles.
- **Inspect State Endpoint**: Handles requests for listing and retrieving collectibles.

The Rollups API ensures that state changes are managed securely and efficiently, leveraging Cartesi's technology for robust transaction handling.

---

## Contributing

We welcome contributions to enhance the Collectible Marketplace dApp. Please follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**: `git checkout -b feature/your-feature`
3. **Commit Your Changes**: `git commit -am 'Add new feature'`
4. **Push to Your Branch**: `git push origin feature/your-feature`
5. **Open a Pull Request** on GitHub

For larger changes or new features, please open an issue first to discuss your ideas.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

