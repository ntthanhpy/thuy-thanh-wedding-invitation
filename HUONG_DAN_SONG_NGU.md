# Thiệp song ngữ Việt – Anh

## Dùng và chia sẻ
- Nhấn **VI** hoặc **EN** ở góc trên bên trái. Có thể chọn ngay trước khi mở thiệp.
- Người xem được ghi nhớ ngôn ngữ trên trình duyệt, nếu trình duyệt cho phép lưu.
- Thêm `?lang=en` vào cuối địa chỉ thiệp để mở trực tiếp bằng tiếng Anh; `?lang=vi` để mở bằng tiếng Việt. Có thể kết hợp tên khách như `?lang=en&khach=Alex`. Ví dụ chỉ là phần tham số; dùng cùng địa chỉ website của bạn.
- Nội dung khách đã nhập và lựa chọn RSVP vẫn giữ khi đổi ngôn ngữ. Giá trị RSVP gửi tới Google Sheet vẫn giữ nguyên tiếng Việt như phiên bản cũ để tránh thay đổi dữ liệu đang dùng.

## Cập nhật project
Trong gói cập nhật, sao chép đè đúng các file `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/js/i18n.js` và `assets/images/vietqr.png` vào project. Đảm bảo upload thêm `assets/js/i18n.js`, đây là file mới bắt buộc. Giữ đúng tên và cấu trúc thư mục. Commit và push, sau đó Ctrl+F5 để kiểm tra. Không cần thay các ảnh hoặc nhạc khác.

## Chỉnh nội dung
- Nội dung tiếng Việt trên trang và nội dung tiếng Anh tương ứng được đặt trong `index.html` với các thuộc tính `data-en`, `data-en-html`, `data-en-aria`, `data-en-placeholder` và `data-en-alt`.
- Các sự kiện nằm trong `EVENTS` tại `assets/js/main.js`. Khi đổi thông tin, cập nhật cả trường tiếng Việt và các trường tương ứng trong `en`. Kiểm tra các nhãn tháng, năm trong HTML tạo sự kiện nếu đổi tháng hoặc năm.

## Những điểm cần xác nhận trước khi gửi
- Ảnh bìa ghi 24 và 28/11, trong khi các sự kiện chi tiết là 23 và 24/11. Có thể đây là những dịp khác nhau; cần kiểm tra để khách hiểu rõ.
- Giờ hiển thị là 13:00 ngày 23 và 10:00 ngày 24, nhưng `EVENTS.at` dùng 09:00 cho cả hai. Bộ đếm ngược dùng `at`. Bản song ngữ giữ nguyên dữ liệu gốc, không tự sửa giờ.
- Ảnh QR được khôi phục từ `assets/images_old/vietqr.png`; xác nhận mã và số tài khoản trước khi sử dụng.
- Yêu cầu gửi lời chúc dùng `no-cors`; thông báo trên trang không xác nhận chắc chắn dữ liệu được ghi vào Sheet. Cần gửi thử và kiểm tra Sheet.
- `assets/images_old` trong project đầy đủ chứa ảnh gốc dung lượng lớn. Không xóa tự động; có thể lưu ngoài repository nếu không còn dùng sau khi sao lưu.
