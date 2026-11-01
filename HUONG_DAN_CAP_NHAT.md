# Bản cập nhật hiệu ứng thiệp cưới

## Sử dụng

Giữ nguyên cấu trúc thư mục và đưa toàn bộ project lên GitHub Pages. Nếu đang có project, chỉ cần thay `index.html`, `assets/css/style.css` và `assets/js/main.js` bằng các file tương ứng trong bản cập nhật. Xóa cache trình duyệt hoặc tải lại trang nếu chưa thấy thay đổi.

Sau khi nhấn mở thiệp, trang chờ 2 giây rồi tự cuộn. Nút ở góc trên bên phải cho phép dừng hoặc tiếp tục; thao tác cuộn, chạm vào nội dung, bàn phím hoặc chuyển tab sẽ dừng tự cuộn. Thiết bị bật giảm chuyển động sẽ không tự cuộn, nhưng vẫn có thể bật bằng nút. Khi cuộn tới ảnh, ảnh sẽ xuất hiện nhẹ; trên máy tính, rê chuột lên ảnh để xem hiệu ứng phóng nhẹ.

Có thể thay tốc độ tại `AUTO_SCROLL_SPEED` trong `assets/js/main.js`; mặc định 24 pixel/giây.

## Cần kiểm tra trước khi gửi thiệp

- Ngày hiển thị ở đầu trang là 24 và 28/11/2026, nhưng danh sách sự kiện hiện là 23 và 24/11/2026. Hãy xác nhận và cập nhật theo lịch thật.
- Giờ đếm ngược trong `EVENTS.at` đều đang là 09:00, trong khi giờ hiển thị lần lượt là 13:00 và 10:00. Chưa tự ý sửa vì cần xác nhận giờ chính xác.
- Đường dẫn bản đồ hiện tìm kiếm theo địa chỉ, chưa phải ghim vị trí chính xác.
- Ảnh gốc khá nặng; nên tối ưu kích thước, tạo ảnh xem trước riêng để tăng tốc tải.
- Tính năng gửi lời chúc dùng `no-cors`; thông báo trên trang chưa xác nhận chắc chắn dữ liệu đã vào Google Sheet. Hãy gửi thử và kiểm tra trực tiếp trong Sheet.
