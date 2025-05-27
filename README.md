# CrimeGuard

CrimeGuard is a web application that empowers users to report crimes, upload evidence (images/videos), and contribute to a trustworthy ecosystem through community-driven verification. Users can upvote, downvote, and add proof-backed comments on reports, helping validate authenticity and urgency.

![screely-1748359616084](https://github.com/user-attachments/assets/a9de2b8e-f7b9-4424-8c01-b0373dac9b45)

## 🚨 Features

### Community Crime Reporting + AI-Powered Description Generation

Users can file detailed crime reports and upload image or video evidence. An AI model automatically analyzes uploaded media and generates a crime description to speed up report validation and streamline information gathering.

The platform allows anonymous reporting with watermarking to protect user-submitted content from unauthorized reuse.

### User Authentication with OTP Verification

Security is key. CrimeGuard implements OTP-based user authentication, ensuring only legitimate users can submit or interact with reports while maintaining the option for anonymous submissions.

### Upvote/Downvote + Comment Verification System

Each report supports a community validation system:
- **Upvotes/Downvotes** reflect credibility and urgency.
- **Comments** can include supportive evidence or counterclaims.
- Users must include proof for maximum impact, promoting accountability.

### Real-Time Notifications

Stay informed with real-time alerts for new reports near your location, comment activity on posts you've interacted with, or responses to your submissions.

### Filtering, Sorting & Search System

Users can filter and sort reports by:
- Location
- Crime type
- Date
- Credibility score  
A powerful search function helps users quickly find relevant cases.

### Responsive UI + Scalable Architecture

CrimeGuard was built with scalability in mind, ensuring high performance even under heavy user loads. The fully responsive UI delivers a seamless experience across desktop and mobile.

### User Accountability with Privacy

While ensuring user protection through anonymity options and watermarking, the platform also implements strict abuse prevention systems to maintain integrity and accountability.

---

CrimeGuard balances community engagement, AI assistance, and secure infrastructure to create a reliable platform for reporting and verifying public safety issues.

## 📁 Project Structure

```
📦 
├─ .DS_Store
├─ .idea
│  ├─ .gitignore
│  ├─ crimeguard.iml
│  ├─ inspectionProfiles
│  │  └─ Project_Default.xml
│  ├─ misc.xml
│  ├─ modules.xml
│  └─ vcs.xml
├─ backend
│  ├─ .env.example
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ README.md
│  ├─ docker-compose.yml
│  ├─ nest-cli.json
│  ├─ package.json
│  ├─ src
│  │  ├─ main.ts
│  │  ├─ middlewares
│  │  │  └─ guard
│  │  │     ├─ access-token.guard.ts
│  │  │     ├─ admin-access.guard.ts
│  │  │     ├─ community-access.guard.ts
│  │  │     └─ report-access.guard.ts
│  │  ├─ modules
│  │  │  ├─ admin
│  │  │  │  ├─ admin.controller.spec.ts
│  │  │  │  ├─ admin.controller.ts
│  │  │  │  ├─ admin.module.ts
│  │  │  │  ├─ admin.service.spec.ts
│  │  │  │  ├─ admin.service.ts
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-admin.dto.ts
│  │  │  │  │  └─ update-admin.dto.ts
│  │  │  │  └─ entities
│  │  │  │     └─ admin.entity.ts
│  │  │  ├─ app
│  │  │  │  ├─ app.controller.test.ts
│  │  │  │  ├─ app.controller.ts
│  │  │  │  ├─ app.module.ts
│  │  │  │  └─ app.service.ts
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.test.ts
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  ├─ auth.decorator.ts
│  │  │  │  ├─ auth.dto.ts
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  ├─ auth.module.ts
│  │  │  │  ├─ auth.service.test.ts
│  │  │  │  ├─ auth.service.ts
│  │  │  │  ├─ auth.strategy.ts
│  │  │  │  └─ auth.user.dto.ts
│  │  │  ├─ comment
│  │  │  │  ├─ comment.controller.spec.ts
│  │  │  │  ├─ comment.controller.ts
│  │  │  │  ├─ comment.module.ts
│  │  │  │  ├─ comment.service.spec.ts
│  │  │  │  ├─ comment.service.ts
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-comment.dto.ts
│  │  │  │  │  └─ update-comment.dto.ts
│  │  │  │  └─ entities
│  │  │  │     └─ comment.entity.ts
│  │  │  ├─ database
│  │  │  │  ├─ database.module.ts
│  │  │  │  ├─ database.prisma
│  │  │  │  └─ database.service.ts
│  │  │  ├─ firebase
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-firebase.dto.ts
│  │  │  │  │  └─ update-firebase.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ firebase.entity.ts
│  │  │  │  ├─ firebase.controller.spec.ts
│  │  │  │  ├─ firebase.controller.ts
│  │  │  │  ├─ firebase.module.ts
│  │  │  │  ├─ firebase.service.spec.ts
│  │  │  │  └─ firebase.service.ts
│  │  │  ├─ intelligence
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-intelligence.dto.ts
│  │  │  │  │  └─ update-intelligence.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ intelligence.entity.ts
│  │  │  │  ├─ intelligence.controller.spec.ts
│  │  │  │  ├─ intelligence.controller.ts
│  │  │  │  ├─ intelligence.module.ts
│  │  │  │  ├─ intelligence.service.spec.ts
│  │  │  │  └─ intelligence.service.ts
│  │  │  ├─ media
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-media.dto.ts
│  │  │  │  │  └─ update-media.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ media.entity.ts
│  │  │  │  ├─ media.controller.spec.ts
│  │  │  │  ├─ media.controller.ts
│  │  │  │  ├─ media.module.ts
│  │  │  │  ├─ media.service.spec.ts
│  │  │  │  └─ media.service.ts
│  │  │  ├─ report
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ create-report.dto.ts
│  │  │  │  │  └─ update-report.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ report.entity.ts
│  │  │  │  ├─ report.controller.spec.ts
│  │  │  │  ├─ report.controller.ts
│  │  │  │  ├─ report.module.ts
│  │  │  │  ├─ report.service.spec.ts
│  │  │  │  └─ report.service.ts
│  │  │  ├─ socket
│  │  │  │  └─ socket.gateway.ts
│  │  │  └─ user
│  │  │     ├─ user.module.ts
│  │  │     ├─ user.service.test.ts
│  │  │     └─ user.service.ts
│  │  └─ util
│  │     ├─ cloudinary.config.ts
│  │     └─ sendOTP.ts
│  ├─ test
│  │  ├─ app.e2e.test.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  ├─ tsconfig.tsbuildinfo
│  └─ yarn.lock
├─ client
│  ├─ .eslintrc.json
│  ├─ .gitignore
│  ├─ README.md
│  ├─ components.json
│  ├─ hooks
│  │  └─ page.tsx
│  ├─ next.config.mjs
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ firebase-messaging-sw.js
│  │  ├─ images
│  │  │  ├─ Hero2.jpg
│  │  │  ├─ airbnb.svg
│  │  │  ├─ apple.svg
│  │  │  ├─ detective-notebook.jpg
│  │  │  ├─ disney.svg
│  │  │  ├─ facebook.svg
│  │  │  ├─ logo.png
│  │  │  ├─ quora.svg
│  │  │  ├─ samsung.svg
│  │  │  ├─ sass.svg
│  │  │  ├─ shield.jpg
│  │  │  ├─ slogan.jpg
│  │  │  └─ spark.svg
│  │  ├─ next.svg
│  │  └─ vercel.svg
│  ├─ src
│  │  ├─ app
│  │  │  ├─ (admin)
│  │  │  │  ├─ admindashboard
│  │  │  │  │  ├─ entry
│  │  │  │  │  │  ├─ _datatable
│  │  │  │  │  │  │  ├─ action.tsx
│  │  │  │  │  │  │  └─ data.tsx
│  │  │  │  │  │  ├─ details
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ overview
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ post
│  │  │  │  │     └─ page.tsx
│  │  │  │  └─ layout.tsx
│  │  │  ├─ (user)
│  │  │  │  ├─ layout.tsx
│  │  │  │  └─ userdashboard
│  │  │  │     ├─ community
│  │  │  │     │  ├─ [id]
│  │  │  │     │  │  └─ page.tsx
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ overview
│  │  │  │     │  ├─ charts
│  │  │  │     │  │  ├─ chart1.tsx
│  │  │  │     │  │  ├─ chart2.tsx
│  │  │  │     │  │  └─ chart3.tsx
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ report
│  │  │  │     │  ├─ _datatable
│  │  │  │     │  │  ├─ action.tsx
│  │  │  │     │  │  └─ data.tsx
│  │  │  │     │  ├─ create-report
│  │  │  │     │  │  └─ page.tsx
│  │  │  │     │  ├─ details
│  │  │  │     │  │  └─ [id]
│  │  │  │     │  │     └─ page.tsx
│  │  │  │     │  ├─ edit
│  │  │  │     │  │  └─ [id]
│  │  │  │     │  │     └─ page.tsx
│  │  │  │     │  └─ page.tsx
│  │  │  │     └─ settings
│  │  │  │        └─ page.tsx
│  │  │  ├─ _home
│  │  │  │  ├─ Benefit.tsx
│  │  │  │  ├─ Bottom.tsx
│  │  │  │  ├─ BottomCard.tsx
│  │  │  │  ├─ Hero.tsx
│  │  │  │  ├─ SubHero.tsx
│  │  │  │  └─ Works.tsx
│  │  │  ├─ favicon.ico
│  │  │  ├─ forget-password
│  │  │  │  ├─ otp
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ globals.css
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ signin
│  │  │  │  └─ page.tsx
│  │  │  └─ signup
│  │  │     ├─ page.tsx
│  │  │     └─ verify
│  │  │        ├─ otp
│  │  │        │  └─ page.tsx
│  │  │        └─ page.tsx
│  │  ├─ components
│  │  │  ├─ AdminSidebar
│  │  │  │  └─ page.tsx
│  │  │  ├─ Carousel
│  │  │  │  └─ page.tsx
│  │  │  ├─ Firebase
│  │  │  │  ├─ firebase.ts
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ util
│  │  │  │     └─ requestPermission.ts
│  │  │  ├─ Footer
│  │  │  │  └─ page.tsx
│  │  │  ├─ Header
│  │  │  │  └─ page.tsx
│  │  │  ├─ Url
│  │  │  │  └─ page.tsx
│  │  │  ├─ UserSidebar
│  │  │  │  └─ page.tsx
│  │  │  ├─ tableContext
│  │  │  │  └─ page.tsx
│  │  │  └─ ui
│  │  │     ├─ avatar.tsx
│  │  │     ├─ button.tsx
│  │  │     ├─ card.tsx
│  │  │     ├─ chart.tsx
│  │  │     ├─ command.tsx
│  │  │     ├─ dialog.tsx
│  │  │     ├─ dropdown-menu.tsx
│  │  │     ├─ form.tsx
│  │  │     ├─ input-otp.tsx
│  │  │     ├─ input.tsx
│  │  │     ├─ label.tsx
│  │  │     ├─ navigation-menu.tsx
│  │  │     ├─ phone-input.tsx
│  │  │     ├─ popover.tsx
│  │  │     ├─ scroll-area.tsx
│  │  │     ├─ select.tsx
│  │  │     ├─ sheet.tsx
│  │  │     ├─ switch.tsx
│  │  │     ├─ table.tsx
│  │  │     ├─ textarea.tsx
│  │  │     └─ tooltip.tsx
│  │  └─ lib
│  │     └─ utils.ts
│  ├─ tailwind.config.ts
│  ├─ tsconfig.json
│  └─ yarn.lock
└─ package-lock.json
```



## 🛠️ Tech Stack

- Frontend: React, Next.js, TailwindCSS,
- Backend: Node.js, Nestjs
- Database: PostgreSql
- ORM: Prisma
- Real Time: Socket.io

## 🚦 Getting Started

### Frontend or client

1.  Clone the repository

```
git clone https://github.com/farhanpavel/crimeguard
```

2.  Go to the client folder

```
cd client
```

3.  Install dependencies in the client folder

```
npm install
```

4.  Run the development server in the client folder

```
npm run dev
```

5.  Build for production

```
npm run build
```

6.  Watch it live on your browser in this URL

```
http://localhost:3000
```

### Backend or server

1.  Go to the server folder

```
cd server
```

2.  Install dependencies in the server folder

```
npm install
```

3.  Run the development server in the server folder

```
nodemon app
```

4.  The server is running on

```
http://localhost:4000
```


## 🤝 Team Contribution

1.  Md. Farhan Islam Pavel - Team Lead & Frontend Developer

    - UI/UX Design, Frontend Development

2.  Md. Kaif Ibn Zaman - Backend Developer

    - Backend Features development, API development, Database Design

3.  Zunaid Ali - Backend Developer

    - Features Testing, Security Testing, Documentation writing

## 📝 Scripts

1.  npm run dev - Start development server
2.  npm run build - Build for production
3.  npm start - Start production server
4.  npm run lint - Run ESLint
5.  nodemon app - Start backend server

## 🌎 .env

```
env Backend

DATABASE_URL=""
ACCESS_KEY = ""
REFRESH_KEY = ""
BINDUSMS_API_KEY = ""
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
API_KEY= ""
OTP_KEY=""


#FCM Info
TYPE=service_account
PROJECT_ID=
PRIVATE_KEY_ID=
PRIVATE_KEY=
CLIENT_EMAIL=firebase-
CLIENT_ID=
AUTH_URI=
TOKEN_URI=
AUTH_PROVIDER_X509_CERT_URL=
CLIENT_X509_CERT_URL=
UNIVERSE_DOMAIN=

```


## 📜 License

This project is licensed under the MIT License.
