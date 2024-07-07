
 [TableauToGo](https://blackgalois.com)
# Tableau-to-Go

Tableau-to-Go is a web application for creating and visualizing Ferrers diagrams interactively. The application allows users to click on boxes to fill them, calculate hook lengths, and display the corresponding partition and hookset. The layout is responsive and optimized for both desktop and mobile devices.

## Features

- **Interactive Ferrers Diagram**: Click on boxes to fill them and display the hook lengths.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Color Picker**: Choose different colors for the boxes.
- **Partition and Hookset Display**: View the partition and hookset of the current diagram.
- **Clear Button**: Reset the Ferrers diagram.

## Screenshots

![Desktop View](screenshots/desktop_view.png)
![Mobile View](screenshots/mobile_view.png)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/tableau-to-go.git
    cd tableau-to-go
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Start the server**:

    ```sh
    npm start
    ```

4. **Open your browser** and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
tableau-to-go/
├── node_modules/
├── public/
│   ├── styles.css
│   └── script.js
├── views/
│   └── index.ejs
├── server.js
├── package.json
```

## Usage

- **Drawing**: Click or tap on the boxes to fill them. The hook lengths will be displayed automatically.
- **Color Picker**: Select a color from the color picker on the right side and use it to fill the boxes.
- **Partition and Hookset Display**: Toggle the display of the partition and hookset using the buttons at the top.
- **Clear Diagram**: Use the "Clear" button to reset the Ferrers diagram.

## License

This project is licensed under the MIT License.

## Acknowledgments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any inquiries or feedback, please reach out to `eimathiucaltech@gmail.com`.
