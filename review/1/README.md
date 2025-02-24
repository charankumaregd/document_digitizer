## Project title

An OCR-Based Solution for Digitizing Handwritten Old Documents with Regional Language Translation

| Team Members      | Reg. No.     |
| ----------------- | ------------ |
| Charankumar E G D | 921321205029 |
| Arunprasad S      | 921321205015 |
| Dharani Dharan R  | 921321205032 |

| Mentor                                                                       |
| ---------------------------------------------------------------------------- |
| Mrs. A. Sangeetha, M.E., Ph.D., Assistant Professor - Information Technology |

| Date       |
| ---------- |
| 25/02/2025 |

## Proposed Methodology

- Upload: Users upload handwritten documents (PDF, JPEG, PNG).

- Preprocessing: Enhances quality (Grayscale, Denoising, Normalization, Thresholding, Deskewing).

- OCR Processing: Extracts text using Google Vision API for high accuracy.

- Post-Processing: Cleans, structures, and formats text for better readability.

- Translation: Converts text into English, Tamil, Hindi, Telugu, Malayalam, Kannada.

- Output & Download: Exports processed text as TXT, PDF, Word files.

- Subscription: Free (5 pages/month for 2 months) & Paid (₹99/20 pages, ₹199/50 pages, ₹399/100 pages).

## Prototype

### Home Page

![Home Page](assets/images/home.png)

### Upload Page

![Upload Page](assets/images/upload.png)

### Editor Page

![Editor Page](assets/images/editor.png)

## Tools & Frameworks

| Frontend     | Backend          | Authentication & Payments | Other Tools |
| ------------ | ---------------- | ------------------------- | ----------- |
| React.js     | Python           | Clerk                     | Git         |
| TypeScript   | Flask            | Razorpay                  | GitHub      |
| Tailwind CSS | OpenCV           |                           | Postman     |
|              | Google Vision    |                           | PostgreSQL  |
|              | Google Translate |

## Flowchart

```mermaid
---
config:
  look: classic
  theme: base
  themeVariables:
    primaryColor: '#E2EAF4'
    edgeLabelBackground: '#fff'
    lineColor: '#010101'
  layout: fixed
---
flowchart LR
    A["Home Page"] --> B["Login/Signup"] & C["Dashboard"] & M["Docs"] & N["Privacy Policy"] & O["Terms & Conditions"] & x{"isAuthenticated?"}
    B --> C
    C --> D["Documents"] & E["Upload"] & G["Subscription"] & H["Settings"] & K["Support"] & L["Logout"]
    E --> F["Editor"]
    H --> I["Deletion Time"] & J["API Key"]
    L --> A
    x -- False --> B
    x -- True --> C & L
```

## Thankyou
