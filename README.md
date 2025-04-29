# Real-Time Behavioral Widget

This project provides an embeddable widget that enables real-time behavioral analysis and dynamic content rendering based on user attributes.

## Setup the Environment

```bash
# create .env file from the .env.example template
$ cp .env.example .env
```

## Run the application with Docker Compose

```bash
# build and start the application
$ docker-compose up --build -d

# run in detached mode (background)
$ docker-compose up -d

# stop and remove all containers
$ docker-compose down

# access sh inside the container
$ docker exec -it behavioral-widget sh
```

## Project setup

```bash
# install dependencies
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Use Case

### Embedding the Real-Time Behavioral Widget

To embed the Real-Time Behavioral Widget on any web page, simply include the following `<script>` tag in your HTML. This will load the widget with the desired theme:

#### Example Embed Script:

```html
<script src="http://localhost:3000/gateway/widget.js?theme=dark"></script>
```

You can replace the `theme` parameter with other available themes (e.g., `light`, `dark`) depending on your configuration.

#### Example HTML:

Here's a complete example located in `public/example.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Real-Time Behavioral Widget</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }

    .block-body {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      height: 100vh;
      margin: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="block-body">
    <h1>Welcome to the Real-Time Behavioral Widget</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
  </div>

  <script src="http://localhost:3000/gateway/widget.js?theme=dark"></script>
</body>
</html>
```

This will render the widget on the page and allow it to interact with the backend in real time based on user behavior and configuration. Make sure your local server is running at `localhost:3000` when testing.
