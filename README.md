@"

# 🏥 HealthCare Booking - Frontend

VIDEO DEMO: [https://youtu.be/e0fqASWgtB4](https://www.youtube.com/watch?v=rleppXkwErY)

> **Ứng dụng đặt lịch khám bệnh trực tuyến** - Kết nối bệnh nhân với các bác sĩ chuyên khoa hàng đầu

### 🏠 Trang chủ

- **Header responsive** với sidebar navigation
- **Multi-language support** (Tiếng Việt / English)
- **Banner search** cho tìm kiếm nhanh
- **Section carousel** hiển thị chuyên khoa, cơ sở y tế, bác sĩ nổi bật

### 👨‍⚕️ Quản lý Bác sĩ

- **Profile chi tiết** với thông tin chuyên môn
- **Lịch khám** và slot time có sẵn
- **Đánh giá** và feedback từ bệnh nhân
- **Chuyên khoa** và cơ sở y tế liên kết

### 🏥 Hệ thống Đặt lịch

- **Booking calendar** với UI/UX trực quan
- **Payment integration** (Stripe/PayPal)
- **Email confirmation** tự động
- **Notification system** real-time

## 🛠️ Công nghệ sử dụng

### Frontend Framework

- **React 18.x** - UI Library
- **Redux Toolkit** - State Management
- **React Router v6** - Navigation
- **React Hooks** - Modern React patterns

### Styling & UI

- **SCSS/Sass** - CSS Preprocessor
- **Bootstrap 5** - CSS Framework
- **FontAwesome** - Icon library
- **React-Slick** - Carousel component

### Development Tools

- **Webpack** - Module bundler
- **Babel** - JavaScript compiler
- **ESLint** - Code linting
- **Prettier** - Code formatting

### APIs & Services

- **Axios** - HTTP client
- **React-Intl** - Internationalization
- **Moment.js** - Date handling
- **Lodash** - Utility functions

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 16.x
- **npm** >= 8.x hoặc **yarn** >= 1.22.x
- **Git** để clone repository

### Bước 1: Clone repository

\`\`\`bash
git clone https://github.com/manh0912hehe/Booking-care-web-app.git
cd Booking-care-web-app/reactjs
\`\`\`

### Bước 2: Cài đặt dependencies

\`\`\`bash

# Sử dụng npm

npm install

# Hoặc sử dụng yarn

yarn install
\`\`\`

### Bước 3: Cấu hình environment

\`\`\`bash

# Copy file environment mẫu

cp .env.example .env

# Chỉnh sửa file .env theo hướng dẫn bên dưới

\`\`\`

### Bước 4: Khởi chạy development server

\`\`\`bash

# Development mode

npm start

# Hoặc

yarn start
\`\`\`

Ứng dụng sẽ chạy tại: \`http://localhost:3000\`

## ⚙️ Cấu hình

### Environment Variables

Tạo file \`.env\` trong thư mục root với các biến sau:

\`\`\`bash

# Server Configuration

PORT=3000
NODE_ENV=development

# Backend API

REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_IS_LOCALHOST=1

# Router Configuration

REACT_APP_ROUTER_BASE_NAME=

### Tính năng Responsive:

- **CSS Grid & Flexbox** layout
- **Text truncation** với ellipsis
- **Touch-friendly** buttons và controls
- **Optimized images** với lazy loading

## 🎥 Video Demo


