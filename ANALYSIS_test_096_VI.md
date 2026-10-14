# Phân tích test_096 – kết quả cập nhật Portfolio UAV

**Nguồn:** file `test_096.log` do người phát triển UAV cung cấp. Bản phân tích chỉ sử dụng trường thông số; không công bố tọa độ GPS. Ngày cập nhật hồ sơ: 14/10/2026 (không suy ra là ngày diễn ra chuyến bay).

## Tóm tắt minh chứng

| Chỉ số | test_096 | Phương pháp |
|---|---:|---|
| Tổng số dòng | 10.351 | Đếm dòng log |
| Bản ghi trạng thái `A:` | 7.394 | Khoảng 50 bản ghi/giây |
| Thời lượng ghi log ước lượng | 147,88 giây | 7.394 / 50; file không chứa timestamp tuyệt đối |
| Vòng lặp `DT` | 2494–2505 µs | `DT` từ bản ghi A; tương đương khoảng 400 Hz |
| Mẫu AltHold `AH=1` | 5.452/7.394 | Một đoạn liên tiếp |
| AltHold được kích hoạt | 109,04 giây | 5.452 / 50, từ ~34,46 s đến ~143,48 s |
| Độ cao cao nhất ước lượng | 6,74 m | Max(`ALT100`)/100; không phải đo bằng thước chuẩn |
| Failsafe `FS=1` | 0/7.394 | Không phát hiện trong bản ghi được cung cấp |
| Vòng lặp overrun `O=1` | 0/7.394 | Không phát hiện trong bản ghi được cung cấp |
| GPS 3D fix | 739/739 NAV | `FIX=3`, `FOK=1` |
| Số vệ tinh | 16–25 | NAV `SV`; trung vị 23 |
| Receiver hAcc | 0,492–0,818 m | NAV `HACC` đơn vị mm, *ước lượng của bộ thu GPS* |
| Heading trusted | 1.440/1.478 (97,4%) | POS `HTR=1` |
| PosHold hoạt động thật | Chưa | POS: `SHD=1`, `ALW=0`, `ACT=0` ở toàn bộ bản ghi |
| Companion điều khiển live | Không có bằng chứng | CMP `LIVE=0`, `ENG=0` ở toàn bộ 740 bản ghi |

**Quan trọng:** việc `AH=1` liên tục không cho phép kết luận đã giữ độ cao với sai số dưới một mức nào đó, bởi log không ghi setpoint độ cao để so sánh. Đồ thị thể hiện độ cao thay đổi đáng kể, đặc biệt sau khoảng t=100 s.

**Tồn tại cần xử lý:** HTR có hai đoạn bằng 0, lúc đầu log và khoảng t≈120,7–123,7 s (~3,1 s). Bộ đếm I²C `I2CE` đi từ 2 lên 4, cần truy nguyên và đối chiếu code/các bản ghi chi tiết; GPS `GDMA=0` nhưng `GOVR` giữ 1 trong toàn bộ log (không có thông tin để xác nhận lỗi mới hay lỗi cũ). Chưa đủ điều kiện tuyên bố PosHold đã vận hành kín vòng.

## Đối chiếu mốc test_092 (báo cáo PBL5)

| Nội dung | test_092 | test_096 |
|---|---|---|
| Thời gian log xấp xỉ | 30,6 s | 147,9 s |
| Thời gian cờ AltHold bật | 6,5 s | 109,0 s |
| Max độ cao ước lượng | 5,93 m | 6,74 m |
| Heading trusted | 203/306 (66,3%) | 1.440/1.478 (97,4%) |
| GPS SV | 25–29 | 16–25 |
| Receiver hAcc | 0,232–0,320 m | 0,492–0,818 m |
| Position Hold | Shadow | Shadow |

Hai bài thử khác điều kiện, không chứng minh GPS hay bộ điều khiển của bài thử mới có độ chính xác cao hơn. `hAcc` là *ước lượng độ chính xác* chứ không phải sai số đo so với ground truth.

## Phần website được sửa

- `index.html`: tóm tắt dự án UAV dùng test_096, giữ About Me/học vấn lên đầu.
- `uav.html`: kết quả bay, biểu đồ AltHold, chẩn đoán GPS/heading, bảng so sánh 2 log và giới hạn.
- `cv.html`: dòng thành tích UAV cập nhật ngắn gọn cho nhà tuyển dụng.
- `assets/uav-progress.js`: thêm cột mốc nhật ký và cập nhật trạng thái các phân hệ.
- `data/uav-test096.png`: biểu đồ độ cao, vùng AltHold.
- `data/uav-test096-navigation.png`: biểu đồ receiver hAcc, số vệ tinh và thời điểm mất heading trust.
- `data/uav-test092.png`: được giữ làm mốc lịch sử.

Không đưa toàn bộ file log lên website do log có tọa độ vị trí GPS thực tế. Với các log tương lai, chỉ công khai dữ liệu thống kê hoặc file đã loại bỏ thông tin vị trí nếu cần.
