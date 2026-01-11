# Open J Proxy Website

Official website for Open J Proxy - The intelligent JDBC proxy for scalable Java applications.

## Security

<a href="https://meterian.io" target="_blank" >
   <img src="https://meterian.io/images/brand/badge-light.svg"
        alt="Meterian Security Scanner"
        style="max-width: 100%; width: 550px;"
   />
</a>

*We use Meterian to continuously scan OJP source code for vulnerabilities in our code and open source libraries.*

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

## Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions.

### How It Works

The deployment workflow is triggered automatically whenever code is pushed to the `main` branch. The workflow:

1. Checks out the repository code
2. Configures GitHub Pages
3. Uploads the entire repository as a static site artifact
4. Deploys the artifact to GitHub Pages

### Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions** as the deployment source
3. The site will be automatically deployed on the next push to `main`

### Configuring a Custom Domain

To use a custom domain with GitHub Pages:

1. **Update the CNAME file**: Edit the `CNAME` file in the repository root and replace the entire contents with only your custom domain (no comments or extra lines):
   ```
   example.com
   ```
   or
   ```
   www.example.com
   ```
   
   Commit and push this file to the `main` branch.

2. **Configure DNS settings**: Add DNS records with your domain provider:
   
   **For an apex domain (example.com):**
   - Add the following A records pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   
   **For a subdomain (www.example.com):**
   - Add a CNAME record pointing to: `<username>.github.io`
   
   **For both apex and www:**
   - Configure apex domain A records as above
   - Add a CNAME record for `www` pointing to your apex domain

3. **Enable HTTPS**: In repository **Settings** → **Pages**, check **Enforce HTTPS** (available after DNS propagation)

4. **Verify**: DNS changes may take up to 24 hours to propagate. You can check the status in **Settings** → **Pages**

For more information, see [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Contributing

We welcome contributions! Please see the main [OJP repository](https://github.com/Open-J-Proxy/ojp) for contribution guidelines.

## License

This website is part of the Open J Proxy project. See the main repository for license information.

