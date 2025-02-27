@"

# Hệ Thống Đặt Lịch Khám Bệnh

Ứng dụng web để đặt lịch khám và quản lý dịch vụ y tế.

## Tính Năng

- Hỗ trợ đa ngôn ngữ (Tiếng Anh/Tiếng Việt)
- Xác thực và phân quyền người dùng
- Hệ thống đặt lịch khám với bác sĩ
- Quản lý chuyên khoa
- Quản lý phòng khám
- Hệ thống cẩm nang/blog y tế
- Xác nhận email cho lịch hẹn
- Bảng điều khiển quản trị
- Bảng điều khiển bác sĩ

## Công Nghệ Sử Dụng

- **Frontend:** React.js (v19.0.0)
- **Quản Lý State:** Redux
- **UI Components:**
  - React Bootstrap
  - React Select
  - React Custom Scrollbars
  - React Toastify
  - Font Awesome
- **Đa Ngôn Ngữ:** React-intl
- **Xử Lý Ngày/Giờ:** Moment.js
- **HTTP Client:** Axios
- **CSS:** SCSS

## Cấu Trúc Dự Án

\`\`\`
reactjs/
├── public/
├── src/
│ ├── assets/ # Hình ảnh, biểu tượng
│ ├── components/ # Components tái sử dụng
│ ├── containers/ # Components trang
│ │ ├── Auth/ # Trang xác thực
│ │ ├── Header/ # Component header
│ │ ├── System/ # Trang hệ thống admin
│ │ ├── Patient/ # Trang người dùng
│ │ └── HomePage/ # Components trang chủ
│ ├── services/ # Dịch vụ API
│ ├── store/ # Cấu hình Redux store
│ ├── translations/ # File ngôn ngữ
│ ├── utils/ # Hàm tiện ích
│ └── routes/ # Cấu hình route
\`\`\`

## Cài Đặt và Chạy

1. Clone repository
2. Cài đặt dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Tạo file \`.env\` với các biến môi trường cần thiết
4. Chạy server phát triển:
   \`\`\`bash
   npm start
   \`\`\`

## Scripts Có Sẵn

- \`npm start\` - Chạy ứng dụng trong môi trường phát triển
- \`npm build\` - Build ứng dụng cho production
- \`npm test\` - Chạy bộ test
- \`npm eject\` - Eject từ create-react-app

## Biến Môi Trường

Tạo file \`.env\` trong thư mục gốc với các biến sau:

\`\`\`env
REACT_APP_BACKEND_URL=your_backend_url
REACT_APP_IS_LOCALHOST=true
REACT_APP_FACEBOOK_APP_ID=your_facebook_app_id
\`\`\`

## Chi Tiết Tính Năng

### Hệ Thống Đặt Lịch

- Tích hợp lịch cho đặt lịch hẹn
- Kiểm tra tình trạng còn trống theo thời gian thực
- Hệ thống xác nhận email
- Lịch sử đặt lịch

### Quản Lý Bác Sĩ

- Quản lý hồ sơ
- Quản lý lịch làm việc
- Danh sách lịch hẹn bệnh nhân
- Truy cập hồ sơ bệnh án

### Bảng Điều Khiển Admin

- Quản lý người dùng
- Quản lý bác sĩ
- Quản lý phòng khám
- Quản lý chuyên khoa
- Quản lý cẩm nang

## Đóng Góp

1. Fork repository
2. Tạo branch tính năng (\`git checkout -b feature/TinhNangMoi\`)
3. Commit thay đổi (\`git commit -m 'Thêm tính năng mới'\`)
4. Push lên branch (\`git push origin feature/TinhNangMoi\`)
5. Tạo Pull Request

## Giấy Phép

Dự án này được cấp phép theo Giấy phép MIT - xem file LICENSE để biết thêm chi tiết.
"@ | Out-File -FilePath README.md -Encoding utf8
