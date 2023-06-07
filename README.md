# India Hexmap

India Hexmap is a web-based visualization tool to represent Indian election data using a hexagonal binning method. The visualization is built using D3.js and presents constituency level results in an intuitive, aesthetic, and interactive manner.

<img width="1018" alt="Screenshot 2023-06-07 at 21 07 48" src="https://github.com/a-jiwa/india-hexmap/assets/123359566/a6a1b3f4-6692-4d79-af4f-c544c2db9ec7">

## Features

- Hexagonal representation of Indian constituencies.
- Color-coded hexagons representing winning parties.
- Tooltips providing detailed information about constituencies and winning parties on hover.
- Dynamic and responsive SVG rendering.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- A modern web browser (Google Chrome, Firefox, Safari, etc.)
- A local web server to serve the project files (if running locally)

### Installation

1. Clone the repo
git clone https://github.com/yourusername/india-hexmap.git

2. Move to the project directory
cd india-hexmap


3. Run the local server (example: using Python)
python -m http.server


4. Open your browser and visit http://localhost:8000 (or whatever port you have the server running on)

## File Structure

The project includes the following main files:

- `index.html`: Main HTML file to present the hexmap.
- `styles.css`: CSS file to style the HTML elements and the hexmap.
- `hexmap.js`: JavaScript file to create the hexmap using D3.js.
- `election-data.json`: JSON data file that includes election results and constituency coordinates.
- `party-colors.json`: JSON file to map Indian political parties to specific colors.

## Usage

Hover over the hexagons to see information about the constituency and the winning party.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Election data sourced from the [Election Commission of India's archived results page](https://web.archive.org/web/20190526045510/http://results.eci.gov.in/pc/en/constituencywise/ConstituencywiseU011.htm).

