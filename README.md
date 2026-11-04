# Open J Proxy Website

Official website for Open J Proxy - The intelligent JDBC proxy for scalable Java applications.

## Security

<a href="https://meterian.io" target="_blank">
   <img src="https://meterian.io/images/brand/badge-light.svg"
        alt="Meterian Security Scanner"
        style="max-width: 100%; width: 550px; height: auto;">
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

- **Homepage** (`index.html`) - Overview, features, call-to-action, and a hero link to "Break The Spiral", the first song created for Open J Proxy (opens YouTube in a new tab)
- **Products** (`products.html`) - Detailed product information and specifications
- **Documentation** (`documentation.html`) - Getting started guide and technical documentation
- **Use Cases** (`use-cases.html`) - Real-world applications and success stories
- **About** (`about.html`) - Mission, values, and project information
- **Contact** (`contact.html`) - Contact forms and community links
- **Check Email Confirmation** (`subscribe-check-email.html`) - Intermediary page instructing users to confirm subscription by email

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

## OJP Quest

OJP Quest is a static, account-free learning game at [`quest.html`](quest.html), with three quests, 24 world adventures, and 72 learning challenges. The homepage presents a dismissible invitation; a persistent navigation link is available across the site's main pages. Quest code and content load only on the quest page. All artwork is generated as original inline SVG, and the feature adds no frontend dependencies, backend, cookies, or external runtime services.

The quest page omits the site's navigation menu. Its enlarged top-left **← Leave** link calls browser history back, returning to the previous page without resetting quest progress. With no previous history entry, it stays on the quest page.

The quest stylesheet and entry module use matching version query strings in `quest.html` so returning visitors, including mobile browsers, fetch the updated Leave control rather than cached assets. Bump both versions when changing the quest navigation.

### Content and game logic

- `js/quest/content.mjs` defines the three quests, their learning objectives, and the collection of worlds. The authored adventures are in `js/quest/floodgate.mjs` and `js/quest/database-freedom.mjs`; the original Connection Crisis worlds remain in `content.mjs`.
- `js/quest/engine.mjs` owns progression, validation, persistence, replay, badge unlocks, and XP. Each quest awards 50 XP for each of its three objectives (150 XP per quest, 450 total); incorrect answers, retries, and replaying mastered objectives earn no XP. World-specific badges are earned after completing the technology reveal.
- The Floodgate Protocol teaches overload, client-side reactive throttling, and controlled recovery. The Database Freedom Quest teaches connectivity-layer independence without implying universal SQL translation or automatic database migration.
- `js/quest/app.mjs` renders the shared story/challenge/reveal/reward flow, inline SVG illustrations, downloadable achievement cards, and the non-transmitting `ojpquest:event` browser event interface. Add listeners for that custom event if a future privacy-reviewed analytics integration is approved; the game does not send analytics to a service.
- `css/quest.css` styles the quest; the invitation and persistent navigation entry are integrated with the site's existing `css/style.css`, `js/main.js`, and static HTML pages.
- `tests/quest.test.mjs` uses Node's built-in test runner to cover game rules, content shape, and storage behavior.

### Adding worlds and editing questions

Add worlds to the appropriate quest's `worlds` list and provide a unique `id`, `palette`, `badge`, genre, description, three acts, and victory message. `icon` selects one of the shared original SVG paths in `js/quest/app.mjs`. Each act maps to one of that quest's three objectives and includes a story, a challenge with three options and a zero-based `answer`, and a technically accurate explanation. The shared content preparation supplies hints and incorrect-answer feedback where they are not authored.

Objective IDs are persisted and each is worth 50 XP. Keep the three objectives for each quest unique so XP is awarded once per objective within that quest, even when players switch worlds. The 24 per-world `badge` values are unique; a badge unlocks only after the third challenge and technology reveal are completed.

### Anonymous progress and reset

Progress is stored under the versioned `ojp-quest-progress` key in browser `localStorage`; it contains no personal data. Stored values are allow-listed and normalized before they affect the interface, and unsupported schema versions or corrupted JSON start a fresh game. If persistent storage is blocked, the game falls back to tab-scoped `sessionStorage`; if that is unavailable too, it continues in memory for the current page session. The reset action clears quest progress, including the invitation dismissal. These locally stored XP and badges are cosmetic achievements, not verified credentials.

### eBook destination and deployment

There is no public PDF asset in this repository. The reward points to the existing eBook email-signup flow configured by `EBOOK_SIGNUP_URL` in `js/quest/content.mjs`; it is clearly labeled as optional, and neither gameplay nor badge completion asks for an email or subscription. The destination currently delivers the eBook through the existing email-list mechanism. If a direct, public eBook URL becomes available, update that constant and its reward copy; verify the resource before describing it as a download.

This feature uses the existing static-site and GitHub Pages deployment—there is no separate build step. Run locally with the existing Python server instructions above and open `http://localhost:8000/quest.html`. Run the quest tests with:

```bash
node --test tests/quest.test.mjs
```

Pushes to `main` continue to deploy through the existing GitHub Pages workflow. The game has not been tested with assistive-technology combinations beyond semantic markup and keyboard/focus behavior; browser compatibility and a screen-reader review remain useful before a broad accessibility claim.
