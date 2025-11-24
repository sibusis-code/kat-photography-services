# Kat Photography Services Website

A simple, professional website for Kat Photography Services to showcase their photography work.

## Features

- Responsive design
- Home page with hero section
- About section highlighting the business and award
- Portfolio gallery with placeholder images
- Contact form and information
- Smooth scrolling navigation

## Setup

1. Open `index.html` in a web browser to view the website.
2. To customize:
   - Replace placeholder images in the portfolio section with actual photos.
   - Update contact information if needed.
   - Modify styles in `style.css` for branding.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Contact

For bookings: katphotographyservices@gmail.com
Phone: 065 382 4131
 
## What's new (improvements)

- Modern, professional layout and color scheme
- Responsive grid-based portfolio and mobile navigation
- Accessible lightbox preview for images (click to open)
- Polished buttons, shadows and spacing for a premium feel
- Client-side form feedback (placeholder for server integration)

## How to insert real photos

1. Replace a placeholder box inside `.photo` with an `<img>` tag, for example:

```html
<div class="photo" data-title="Wedding — The Vows" data-desc="Romantic wedding highlights" data-src="images/wedding1.jpg">
   <img src="images/wedding1.jpg" alt="Wedding — The Vows">
   <p>Wedding — The Vows</p>
</div>
```

2. Optionally set `data-src` on the `.photo` element so the lightbox can use the full-size image.

## Preview locally

Open `index.html` in your browser, or serve with a simple static server (Python example):

```pwsh
# from repository folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

If you'd like, I can add sample image files (low-res) to the `images/` folder and update the gallery to use them so you can preview a production-like experience.

## New: form submission and social links

- I added social icons in `icons/` and sample SVG placeholders in `images/`.
- Contact form supports several deployment options:

  1. Netlify Forms
     - Set `data-netlify="true"` on the `<form>` and deploy the site to Netlify. Netlify will collect submissions without extra server code.
     - The form already includes `<input type="hidden" name="form-name" value="contactForm">` required for Netlify.

  2. Formspree (or any form endpoint)
     - Create a Formspree form and replace the `action` attribute on the `<form>` with your Formspree endpoint (e.g. `https://formspree.io/f/your-id`) OR add the endpoint to the form as `data-endpoint="https://formspree.io/f/your-id"`.
     - The site JS will POST the form data to that endpoint and show a success message.

  3. Custom endpoint
     - If you have your own backend API, set the form `action` to your endpoint URL or use `data-endpoint` and the form will POST via fetch.

If you want, I can set up and demonstrate a Formspree form for you (I will need the Formspree form ID or your permission to create a demo account), or prepare the site for Netlify deployment.
I added sample low-res SVG images in `images/` and small SVG icons in `icons/`.

What I added for preview:

- `images/wedding1.svg`, `images/portrait1.svg`, `images/event1.svg`, `images/commercial1.svg`, `images/family1.svg` — low-res SVG placeholders used in the gallery
- `icons/award.svg`, `icons/wedding-icon.svg`, `icons/portrait-icon.svg` — small icons used in the About stats

Theme toggle:

- A theme toggle button is in the header. It persists your choice to `localStorage` and respects your OS preference on first load.

How to change placeholder images:

Replace the SVGs under `images/` with your production JPEG/PNG files (same filenames or update `index.html`), and optionally set `data-src` on the `.photo` elements to point to the high-resolution images for the lightbox.