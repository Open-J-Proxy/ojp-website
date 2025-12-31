# Open J Proxy Website

Official website for Open J Proxy - The intelligent JDBC proxy for scalable Java applications.

## About Open J Proxy

Open J Proxy (OJP) is an open-source Java project that acts as a JDBC Type 3 driver and Layer 7 proxy server. It helps decouple Java applications from direct database connection management, enabling:

- **Elastic Scaling**: Scale applications without connection storms
- **Built-in Protection**: Circuit breakers, backpressure, and slow query segregation
- **Zero Code Changes**: Simply swap the JDBC driver and update connection URL
- **Multi-Database Support**: Works with PostgreSQL, MySQL, Oracle, SQL Server, and more
- **Enterprise Ready**: XA transactions, monitoring, and high availability

## Website Structure

This website contains multiple pages designed with a corporate, professional feel emphasizing performance and trust:

- **Homepage** (`index.html`) - Overview, features, and call-to-action
- **Products** (`products.html`) - Detailed product information and specifications
- **Documentation** (`documentation.html`) - Getting started guide and technical documentation
- **Use Cases** (`use-cases.html`) - Real-world applications and success stories
- **About** (`about.html`) - Mission, values, and project information
- **Contact** (`contact.html`) - Contact forms and community links

## Design

The website uses a blue color scheme that conveys:
- **Corporate professionalism**: Clean, modern design
- **Performance**: Fast-loading, responsive layout
- **Trust**: Clear information architecture and transparent messaging

### Color Palette
- Primary Blue: #0066CC
- Secondary Blue: #1E3A8A
- Accent Blue: #60A5FA

## Running the Website

Simply open any HTML file in a web browser. For local development:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Technologies

- HTML5
- CSS3 (Custom styling with CSS variables)
- Vanilla JavaScript (No framework dependencies)
- Responsive design (Mobile-friendly)

## Contributing

We welcome contributions! Please see the main [OJP repository](https://github.com/Open-J-Proxy/ojp) for contribution guidelines.

## License

This website is part of the Open J Proxy project. See the main repository for license information.

